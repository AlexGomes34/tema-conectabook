import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Rotas from './Routes/Rotas'

createRoot(document.getElementById('root')).render(
  <Rotas/>,
)
