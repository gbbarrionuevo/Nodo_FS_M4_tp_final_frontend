import { Link } from 'react-router-dom';
import { usePurchasesData } from '../hooks/usePurchasesData.js';
import PageTransition from '../components/PageTransition.jsx';
import PokeballLoader from '../components/PokeballLoader.jsx';
import PurchasesCard from '../components/PurchasesCard.jsx';

const Purchases = () => {
  const { allData, loading } = usePurchasesData();

  return (
    <>
      <PageTransition>
        <div className="min-h-[80vh] py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Compras</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[500px]">
              <PokeballLoader />
            </div>
          ) : (
            <>
              {allData.length === 0 ? (
                <p className="text-center text-lg font-semibold mt-20">
                  No hay información
                </p>
              ) : (
                <>
                  {allData.map((p, i) => (
                    <PurchasesCard
                      key={p._id}
                      item={i}
                      purchase={p}
                    />
                  ))}
                </>
              )}

              <div className="mt-10">
                <Link
                  to="/home"
                  className="inline-block bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-xl shadow-xl transition"
                >
                  Volver al Home
                </Link>
              </div>
            </>
          )}

        </div>
      </PageTransition>
    </>
  );
}

export default Purchases;