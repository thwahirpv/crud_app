import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './app/store.js'
import { Provider } from 'react-redux'
import Context from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Context>
        <App />
      </Context>
    </Provider>
  </BrowserRouter>,
)
