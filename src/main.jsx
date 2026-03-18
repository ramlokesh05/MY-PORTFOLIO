import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import App from './App.jsx'
import { TransitionProvider } from './components/PageTransition.jsx'
import './index.css'

function Root() {
  const navigate = useNavigate()
  return (
    <TransitionProvider navigate={navigate}>
      <App />
    </TransitionProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>,
)
