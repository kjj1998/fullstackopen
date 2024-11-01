import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App.jsx'
import noteReducer from './reducers/noteReducer.js'

const store = createStore(noteReducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
