import { useState, useEffect } from 'react';
 
import Title from "./components/Title";
import DiaryEntries from './components/DiaryEntries';

import { Entry } from './types';
import { getAllDiaryEntries } from './diaryService';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(entries => setEntries(entries));
  }, [])

  return (
    <div>
      <Title title="Diary entries"/>
      <DiaryEntries diaryEntries={entries}/>
    </div>
  );
}

export default App;