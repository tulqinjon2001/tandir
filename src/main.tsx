import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootEl = document.getElementById('root')!
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Tezkor FCP uchun ko'rsatilgan shell ni olib tashlash
requestAnimationFrame(() => {
  document.getElementById('app-shell')?.remove()
})
