import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SweetAlertProvider } from './context/SweetAlertContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <SweetAlertProvider>
            <ToastProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </ToastProvider>
          </SweetAlertProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);