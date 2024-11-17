import { useState, useEffect } from 'react';
 
import Title from "./components/Title";
import DiaryEntries from './components/DiaryEntries';
import DiaryEntryForm from './components/DiaryEntryForm';

import { Entry } from './types';
import { getAllDiaryEntries } from './diaryService';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(entries => setEntries(entries));
  }, [entries])

  return (
    <div>
      <Title title="Add new entry"/>
      <DiaryEntryForm diaryEntries={entries}/>
      <Title title="Diary entries"/>
      <DiaryEntries diaryEntries={entries}/>
    </div>
  );
}

export default App;