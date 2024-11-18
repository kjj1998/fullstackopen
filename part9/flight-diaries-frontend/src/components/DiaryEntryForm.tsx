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
      const data = await createDiaryEntry({ date, visibility, weather, comment }) as Entry;
      setEntries(entries.concat(data));

      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
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
      <div>date <input value={date} onChange={(event) => setDate(event.target.value)}/></div>
      <div>visibility <input value={visibility} onChange={(event) => setVisibility(event.target.value)}/></div>
      <div>weather <input value={weather} onChange={(event) => setWeather(event.target.value)}/></div>
      <div>comment <input value={comment} onChange={(event) => setComment(event.target.value)}/></div>
      <button type='submit'>add</button>
    </form>
  )
}

export default DiaryEntryForm;