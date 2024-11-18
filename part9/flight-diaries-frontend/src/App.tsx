import { useState, useEffect } from 'react';
 
import Title from "./components/Title";
import DiaryEntries from './components/DiaryEntries';
import DiaryEntryForm from './components/DiaryEntryForm';
import ErrorNotification from './components/ErrorNotification';

import { Entry } from './types';
import { getAllDiaryEntries } from './diaryService';

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [errorNotification, setErrorNotification] = useState<string>('');

  useEffect(() => {
    getAllDiaryEntries().then(entries => setEntries(entries));
  }, [entries])

  return (
    <div>
      <Title title="Add new entry"/>
      <ErrorNotification message={errorNotification} />
      <DiaryEntryForm diaryEntries={entries} setErrorNotification={setErrorNotification}/>
      <Title title="Diary entries"/>
      <DiaryEntries diaryEntries={entries}/>
    </div>
  );
}

export default App;