import { useTheme } from '../context/ThemeContext.jsx';
import Button from './Button.jsx';

const ThemeButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <Button
        type="button"
        onClick={toggleTheme}
        title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="w-6 h-6 mt-0.5 rounded-full transition-colors duration-300 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        <i className={`bi ${isDarkMode ? 'bi-sun-fill text-yellow-400' : 'bi-moon-fill text-gray-800'}`}></i>
      </Button>
    </>
  );
};

export default ThemeButton;