import { useState } from "react";
import { createDiaryEntry } from "../diaryService";
import { Entry } from "../types";
import axios from "axios";

interface DiaryEntryFormProps {
  diaryEntries: Entry[],
  setErrorNotification: React.Dispatch<React.SetStateAction<string>>
};

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const { diaryEntries, setErrorNotification } = props
  const [entries, setEntries] = useState<Entry[]>(diaryEntries);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      console.log(weather);
      const data = await createDiaryEntry({ date, visibility, weather, comment }) as Entry;
      setEntries(entries.concat(data));

      setDate('');
      setComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        const axiosError = error.response?.data.error[0];
        const path = axiosError.path[0];
        const received = axiosError.received;
        setErrorNotification(`Error: Incorrect ${path}: ${received}`);

        setTimeout(() => setErrorNotification(''), 5000)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>date <input type="date" min="2015-01-01" max="2048-12-31"value={date} onChange={(event) => setDate(event.target.value)}/></div>
      <div>
        visibility &nbsp;&nbsp;
        great <input type='radio' name='visibility' onChange={() => setVisibility('great')}/>
        good <input type='radio' name='visibility' onChange={() => setVisibility('good')}/>
        ok <input type='radio' name='visibility' onChange={() => setVisibility('ok')}/>
        poor <input type='radio' name='visibility' onChange={() => setVisibility('poor')}/>
      </div>
      <div>
        weather &nbsp;&nbsp;
        sunny <input type='radio' name='weather' onChange={() => setWeather('sunny')}/>
        sunny <input type='radio' name='weather' onChange={() => setWeather('sunny')}/>
        cloudy <input type='radio' name='weather' onChange={() => setWeather('cloudy')}/>
        stormy <input type='radio' name='weather' onChange={() => setWeather('stormy')}/>
        windy <input type='radio' name='weather' onChange={() => setWeather('windy')}/>
      </div>
      <div>comment <input value={comment} onChange={(event) => setComment(event.target.value)}/></div>
      <button type='submit'>add</button>
    </form>
  )
}

export default DiaryEntryForm;