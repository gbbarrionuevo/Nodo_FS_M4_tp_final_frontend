import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AdministrationLayout = () => {
  const { hasPermission } = useAuth();

  return (
    <>
      <div className="min-h-[80vh] py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Administración</h2>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[70vh] max-h-[70vh] bg-gray-100 dark:bg-gray-900">
          <aside className="w-full lg:w-60 p-5 me-0 lg:me-6 mb-6 lg:mb-0 space-y-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow">
            {hasPermission("read:user") && (
              <NavLink
                to="users"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg
                ${isActive
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Usuarios
              </NavLink>
            )}

            {hasPermission("read:role") && (
              <NavLink
                to="roles"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg
                ${isActive
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Roles
              </NavLink>
            )}

            {hasPermission("read:permission") && (
              <NavLink
                to="permissions"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg
                ${isActive
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Permisos
              </NavLink>
            )}

            {hasPermission("read:card") && (
              <NavLink
                to="cards"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg
                ${isActive
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Cartas
              </NavLink>
            )}

            {hasPermission("read:contact") && (
              <NavLink
                to="contact"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg
                ${isActive
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Contactos
              </NavLink>
            )}
          </aside>

          <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow text-gray-900 dark:text-gray-100">
            <Outlet />
          </main>

        </div>
      </div>
    </>
  );
};

export default AdministrationLayout;