import { Entry } from "../types";

interface DiaryEntryProps {
  diaryEntry: Entry
}

const DiaryEntry = (props: DiaryEntryProps) => {
  const { diaryEntry } = props;
  
  return ( 
    <>
      <h3>{diaryEntry.date}</h3>
      <div>visibility: {diaryEntry.visibility}</div>
      <div>weather: {diaryEntry.weather}</div>
    </>
  )
};

export default DiaryEntry;