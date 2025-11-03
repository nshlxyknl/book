import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { CountProvider } from './context/CountProvider'
import { CartProvider } from './context/CartProvider'
import { SearchProvider } from './context/SearchProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SearchProvider>
    <AuthProvider>
      <CountProvider>
        <CartProvider>
    <App />
    </CartProvider>
    </CountProvider>
    </AuthProvider>
   </SearchProvider>
  </StrictMode>,
)
