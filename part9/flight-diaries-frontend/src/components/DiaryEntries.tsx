import DiaryEntry from "./DiaryEntry";

import { Entry } from "../types";

interface DiaryEntriesProps {
  diaryEntries: Entry[]
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  const { diaryEntries } = props;
  
  return (
    diaryEntries.map(diaryEntry => <DiaryEntry key={diaryEntry.id} diaryEntry={diaryEntry}/>)
  )
}

export default DiaryEntries;