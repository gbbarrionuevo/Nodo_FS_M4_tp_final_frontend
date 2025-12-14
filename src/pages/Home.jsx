import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const Home = () => {
  return (
    <>
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 pointer-events-none opacity-20 blur-lg select-none">
          <img
            src="/portada.png"
            alt="Portada"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <motion.img
            src="/portada.png"
            alt="Portada"
            className="mx-auto drop-shadow-2xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="space-y-6 text-center md:text-left max-w-md">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Coleccioná tus Cartas Pokémon Favoritas
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300">
              Descubrí cartas únicas, ampliá tu colección y encontrá esas piezas que faltan en tu mazo.
              Una tienda rápida, moderna y pensada para fans de Pokémon TCG.
            </p>

            <Link
              to="/store"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-xl transition"
            >
              Ir a la Tienda
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;