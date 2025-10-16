import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { CountProvider } from './context/CountProvider'
import { CartProvider } from './context/CartProvider'
import { PayProvider } from './context/PayProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <AuthProvider>
       <PayProvider>
      <CountProvider>
        <CartProvider>
    <App />
    </CartProvider>
    </CountProvider>
     </PayProvider>
    </AuthProvider>
   
  </StrictMode>,
)
