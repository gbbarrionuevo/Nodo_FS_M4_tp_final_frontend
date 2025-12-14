import ThemeButton from '../components/ThemeButton.jsx';

export default function AuthLayout({ children }) {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 relative">
          <div className="absolute top-3 right-3">
            <ThemeButton />
          </div>

          {children}
        </div>
      </div>
    </>
  );
}