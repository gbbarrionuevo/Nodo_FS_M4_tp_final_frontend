import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import ThemeButton from './ThemeButton.jsx';
import Button from './Button.jsx';

const Header = () => {
  const location = useLocation();
  const { user, logout, hasPermission } = useAuth();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <header role="banner" className="bg-gray-900 dark:bg-gray-950 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/home" className="flex items-center space-x-3">
              <div className="relative w-7 h-7 rounded-full border border-black overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <h1 className="text-2xl font-bold text-red-500">PokémonCard's</h1>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {hasPermission("read:store") && (
                <Link
                  to="/store"
                  className={isActive("/store") ? "text-red-500 font-bold" : "hover:text-gray-200"}
                >
                  Tienda
                </Link>
              )}

              {hasPermission("read:inventory") && (
                <Link
                  to="/inventory"
                  className={isActive("/inventory") ? "text-red-500 font-bold" : "hover:text-gray-200"}
                >
                  Inventario
                </Link>
              )}

              {hasPermission("read:purchase") && (
                <Link
                  to="/purchases"
                  className={isActive("/purchases") ? "text-red-500 font-bold" : "hover:text-gray-200"}
                >
                  Compras
                </Link>
              )}

              {hasPermission("read:about") && (
                <Link
                  to="/about"
                  className={isActive("/about") ? "text-red-500 font-bold" : "hover:text-gray-200"}
                >
                  Sobre nosotros
                </Link>
              )}

              {hasPermission("create:contact") && (
                <Link
                  to="/contact"
                  className={isActive("/contact") ? "text-red-500 font-bold" : "hover:text-gray-200"}
                >
                  Contacto
                </Link>
              )}

              {hasPermission("read:admin") && (
                <Link
                  to="/administration"
                  className={isActive("/administration") ? "text-red-500 font-bold" : "hover:text-gray-200"}
                >
                  Administración
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              className="md:hidden text-2xl"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <i className="bi bi-list"></i>
            </Button>

            {hasPermission("read:cart") && (
              <Link to="/cart/detail" className="relative p-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-800">
                <i className="bi bi-cart text-xl"></i>
                {totalItems > 0 && <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">{totalItems}</span>}
              </Link>
            )}

            <div className="w-px h-6 bg-gray-500/40"></div>

            <ThemeButton />

            <div className="w-px h-6 bg-gray-500/40"></div>

            <div className="relative z-50">
              <Button
                type="button"
                className="flex items-center space-x-2"
                onClick={() => setOpen(!open)}
              >
                {user?.avatar ? (
                  <img
                    src={ENDPOINTS.static.avatar(user.avatar)}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-700"
                  />
                ) : (
                  <i className="bi bi-person-circle text-2xl"></i>
                )}

                <span className="text-sm">{user?.user_name}</span>
                <i className="bi bi-caret-down-fill text-xs"></i>
              </Button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 dark:bg-gray-900
                 border border-gray-700 rounded shadow-md z-50">
                  {hasPermission("read:profile") && (
                    <Link
                      to='/profile'
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={() => setOpen(false)}
                    >
                      Perfil
                    </Link>
                  )}

                  <Button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-t-none rounded-b-xs"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                  >
                    Salir
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {mobileMenu && (
          <nav className="md:hidden mt-3 bg-gray-800 p-4 rounded-lg space-y-2 text-sm">
            {hasPermission("read:store") && (
              <Link
                onClick={() => setMobileMenu(false)}
                to="/store"
                className={`block py-1 ${isActive("/store") ? "text-red-500 font-bold" : "hover:text-gray-200"}`}
              >
                Tienda
              </Link>
            )}

            {hasPermission("read:inventory") && (
              <Link
                onClick={() => setMobileMenu(false)}
                to="/inventory"
                className={`block py-1 ${isActive("/inventory") ? "text-red-500 font-bold" : "hover:text-gray-200"}`}
              >
                Inventario
              </Link>
            )}

            {hasPermission("read:purchase") && (
              <Link
                onClick={() => setMobileMenu(false)}
                to="/purchases"
                className={`block py-1 ${isActive("/purchases") ? "text-red-500 font-bold" : "hover:text-gray-200"}`}
              >
                Compras
              </Link>
            )}

            {hasPermission("read:about") && (
              <Link
                onClick={() => setMobileMenu(false)}
                to="/about"
                className={`block py-1 ${isActive("/about") ? "text-red-500 font-bold" : "hover:text-gray-200"}`}
              >
                Sobre nosotros
              </Link>
            )}

            {hasPermission("read:contact") && (
              <Link
                onClick={() => setMobileMenu(false)}
                to="/contact"
                className={`block py-1 ${isActive("/contact") ? "text-red-500 font-bold" : "hover:text-gray-200"}`}
              >
                Contacto
              </Link>
            )}

            {hasPermission("read:admin") && (
              <Link
                onClick={() => setMobileMenu(false)}
                to="/administration"
                className={`block py-1 ${isActive("/administration") ? "text-red-500 font-bold" : "hover:text-gray-200"}`}
              >
                Administración
              </Link>
            )}
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;