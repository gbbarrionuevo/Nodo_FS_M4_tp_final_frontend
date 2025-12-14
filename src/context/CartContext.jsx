/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useToast } from '../context/ToastContext.jsx';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useToast();

  const getCart = async () => {
    try {
      const res = await api.get(ENDPOINTS.cart.get);
      setCart(res.data);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error cargando carrito";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const syncCart = async (cardId, action) => {
    try {
      const res = await api.post(ENDPOINTS.cart.sync, { cardId, action });
      setCart(res.data);

      notify(`Carta ${action == "add" ? "agregada" : "eliminada"} correctamente`, "success");

      return res.data;
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al sincronizar carrito";
      notify(msg, "error");
    }
  };

  const totalItems = cart?.cards?.reduce(
    (acc, item) => acc + item.quantity,
    0
  ) || 0;

  const clearCart = () => {
    setCart({ cards: [], total: 0 });
  };

  useEffect(() => {
    if (!token) {
      setCart(null);
      setLoading(false);
      return;
    }

    getCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, loading, syncCart, totalItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}