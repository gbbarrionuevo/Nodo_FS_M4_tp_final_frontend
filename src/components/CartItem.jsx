import { useCart } from '../context/CartContext.jsx';
import Button from './Button.jsx';

const CartItem = ({ item }) => {
  const { syncCart } = useCart();

  return (
    <>
      <article className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
        <img
          src={`${item.card.image}/high.png`}
          alt={item.card.name}
          className="w-28 h-28 object-contain"
        />

        <div className="flex-1 px-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.card.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Rareza: {item.card.rarity}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Serie: {item.card.set?.name}</p>

          <div className="flex items-center gap-3 mt-3">
            <Button
              type="button"
              className="px-3 py-1 bg-gray-300 text-gray-950 hover:bg-gray-400 font-bold"
              onClick={() => syncCart(item.card._id, "remove")}
            >
              <i className="bi bi-dash"></i>
            </Button>

            <span className="text-md font-semibold dark:text-white">{item.quantity}</span>

            <Button
              type="button"
              className="px-3 py-1 bg-gray-300 text-gray-950 hover:bg-gray-400 font-bold"
              onClick={() => syncCart(item.card._id, "add")}
            >
              <i className="bi bi-plus"></i>
            </Button>
          </div>
        </div>

        <div className="min-w-[150px] text-right bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-xl shadow-sm">
          <p className="text-md font-medium text-gray-800 dark:text-gray-200">
            Precio x item: ${item.card.price.toFixed(2)}
          </p>
          <hr className="my-2 border-gray-300 dark:border-gray-600" />
          <p className="text-lg font-bold text-green-600 dark:text-green-300">
            Subtotal: ${item.subtotal.toFixed(2)}
          </p>
        </div>
      </article>
    </>
  );
};

export default CartItem;