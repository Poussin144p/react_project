import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Checkout from "../checkout/Checkout.tsx";

createRoot(document.getElementById('root')!).render(
    // <App />
    <Checkout />
)
