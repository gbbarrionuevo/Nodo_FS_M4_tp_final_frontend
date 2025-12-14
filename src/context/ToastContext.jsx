/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from './ThemeContext';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const { isDarkMode } = useTheme();

  const notify = (message, type = "info", options = {}) => {
    const toastFn = {
      success: toast.success,
      error: toast.error,
      info: toast.info
    }[type] || toast;

    toastFn(message, { ...options });
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);