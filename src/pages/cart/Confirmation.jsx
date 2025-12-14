import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <>
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-xl p-10 text-center max-w-2xl mx-auto border dark:border-gray-700">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">¡Compra realizada con éxito!</h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Gracias por tu compra. Tu pedido fue procesado correctamente.</p>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Tiempo estimado de entrega: <span className="font-semibold text-gray-900 dark:text-gray-100">3 - 5 días hábiles</span>
          </p>

          <Link
            to="/home"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl shadow-xl font-semibold transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
};

export default Confirmation;