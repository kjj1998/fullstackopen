import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './App.jsx'
import noteReducer from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
