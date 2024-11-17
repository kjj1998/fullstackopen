import { useState } from "react";
import { createDiaryEntry } from "../diaryService";
import { Entry } from "../types";

interface DiaryEntryFormProps {
  diaryEntries: Entry[]
};

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const [entries, setEntries] = useState<Entry[]>(props.diaryEntries);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const data = await createDiaryEntry({ date, visibility, weather, comment });
    setEntries(entries.concat(data));

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
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