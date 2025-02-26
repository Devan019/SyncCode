import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SocketContext from './contexts/SocketContex.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SocketContext>
      <App />
    </SocketContext>
  </BrowserRouter>
)
