/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import Swal from 'sweetalert2';
import { useTheme } from './ThemeContext.jsx';

const SweetAlertContext = createContext();

export const SweetAlertProvider = ({ children }) => {
  const { isDarkMode } = useTheme();

  const alert = async (message, options = {}) => {
    return Swal.fire({
      theme: isDarkMode ? 'dark' : 'light',
      title: message,
      icon: options.icon || "question",
      showCancelButton: true,
      confirmButtonColor: "#1447e6",
      cancelButtonColor: "#4a5565",
      confirmButtonText: options.confirmButtonText || "Sí",
      cancelButtonText: options.cancelButtonText || "Cancelar",
      ...options
    });
  };

  return (
    <SweetAlertContext.Provider value={{ alert }}>
      {children}
    </SweetAlertContext.Provider>
  );
};

export const useSweetAlert = () => useContext(SweetAlertContext);