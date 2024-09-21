import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import router from './pages/Routs';

createRoot(document.getElementById('root')).render(
  <StrictMode>

      <App/>
  </StrictMode>,
)
