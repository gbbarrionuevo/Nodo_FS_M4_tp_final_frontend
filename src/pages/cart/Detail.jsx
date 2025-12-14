import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import PageTransition from '../../components/PageTransition.jsx';
import PokeballLoader from '../../components/PokeballLoader.jsx';
import CartItem from '../../components/CartItem.jsx';

const Detail = () => {
  const { cart, loading } = useCart();

  if (loading) {
    return (
      <>
        <PageTransition>
          <div className="min-h-[80vh] py-10">
            <div className="flex items-center justify-between mb-6"></div>
            <div className="flex justify-center items-center min-h-[500px]">
              <PokeballLoader />
            </div>
          </div>
        </PageTransition>
      </>
    );
  }

  if (!cart || !cart.cards?.length) {
    return (
      <>
        <PageTransition>
          <div className="min-h-[80vh] py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Inventario</h2>
            </div>

            <p className="text-center text-lg font-semibold mt-20">No hay información</p>

            <div className="mt-10 space-x-2">
              <Link
                to="/home"
                className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl shadow-xl transition"
              >
                Volver al Home
              </Link>

              <Link
                to="/store"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-xl transition"
              >
                Ir a la tienda
              </Link>
            </div>
          </div>
        </PageTransition>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8 p-10 items-start">
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Carrito de compras</h2>

          {cart.cards.map(item => (
            <CartItem
              key={item._id}
              item={item}
            />
          ))}
        </section>

        <aside className="self-start top-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mt-[52px]">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resumen</h3>

          <div className="flex justify-between text-lg font-semibold mb-3">
            <span>Total:</span>
            <span className="text-green-600 dark:text-green-300">${cart.total.toFixed(2)}</span>
          </div>

          <Link
            to="/cart/checkout"
            className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded-xl shadow-xl font-bold mt-4 transition"
          >
            Continuar con el pago
          </Link>
        </aside>
      </div>
    </>
  );
};

export default Detail;