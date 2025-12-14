import { Link } from 'react-router-dom';

const InventoryCard = ({ pokemon }) => {
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize leading-tight">
              {pokemon.name}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-300 tracking-tight">
              Rareza: {pokemon.rarity || "Unknown"}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 tracking-tight">
              Serie: {pokemon.set?.name || "No data"}
            </p>
          </div>

          <Link
            to={`/inventory/${pokemon._id}/detail`}
            className="mt-1 px-3 py-1 text-gray-900 font-bold bg-yellow-400 hover:bg-yellow-500 shadow-xl rounded-xl flex items-center justify-center gap-2 active:scale-95 transition"
            title="Ver detalles"
          >
            <i className="bi bi-search"></i>
          </Link>
        </div>

      </article>
    </>
  );
};

export default InventoryCard;