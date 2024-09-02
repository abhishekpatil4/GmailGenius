import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ResponsiveMessage from './components/ResponsiveMessage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResponsiveMessage />
    <App />
  </StrictMode>,
)
