import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { captureAttribution } from './lib/attribution'
import { schedulePixel } from './lib/pixel'
import './index.css'

captureAttribution()

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

schedulePixel()
