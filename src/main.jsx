import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import File from './File.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <File />
  </StrictMode>,
)
