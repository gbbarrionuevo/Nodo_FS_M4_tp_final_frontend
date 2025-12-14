import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import Button from './Button.jsx';

const StoreCard = ({ pokemon }) => {
  const { syncCart } = useCart();
  const { notify } = useToast();

  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    try {
      setLoading(true);

      await syncCart(pokemon._id, "add");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al agregar al carrito";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 w-full mx-auto hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-center">
          <img
            src={`${pokemon.image}/high.png`}
            alt={pokemon.name}
            className="w-full object-contain drop-shadow-xl"
          />
        </div>

        <div className="flex justify-between items-start mt-3">
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize leading-tight">{pokemon.name}</h2>

            <p className="text-xs text-gray-600 dark:text-gray-300 tracking-tight">Rareza: {pokemon.rarity || "-"}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 tracking-tight">Serie: {pokemon.set?.name || "-"}</p>
            <p className="mt-3 text-xs text-gray-600 dark:text-gray-300 tracking-tight">Stock: {pokemon.quantity || "-"}</p>
          </div>

          <span className="text-xl font-extrabold text-green-600 dark:text-green-400 whitespace-nowrap">${pokemon.price} USD</span>
        </div>

        <Button
          type="button"
          className="mt-4 w-full py-3 text-gray-900 font-bold bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:text-gray-800 disabled:bg-gray-600  disabled:cursor-not-allowed"
          onClick={handleAdd}
          disabled={pokemon.quantity <= 0 || loading}
        >
          {pokemon.quantity <= 0 ? (
            'Sin stock'
          ) : (
            <span>
              <i className="bi bi-cart-plus-fill"></i> {loading ? 'Agregando' : 'Agregar'} al carrito
            </span>
          )}
        </Button>
      </article>
    </>
  );
};

export default StoreCard;