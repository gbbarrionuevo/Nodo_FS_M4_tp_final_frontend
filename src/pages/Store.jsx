import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStoreData } from '../hooks/useStoreData.js';
import PageTransition from '../components/PageTransition.jsx';
import PokeballLoader from '../components/PokeballLoader.jsx';
import StoreCard from '../components/StoreCard.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

const Store = () => {
  const { allData, loading, page, setPage } = useStoreData();
  const [search, setSearch] = useState('');

  const filtered = allData.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const limit = 20;
  const totalFilteredPages = Math.ceil(filtered.length / limit);

  const pageData = filtered.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <>
      <PageTransition>
        <div className="min-h-[80vh] py-10">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Tienda</h2>

            <Input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-60"
              maxLength="90"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[500px]">
              <PokeballLoader />
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
                {pageData.map((p) => (
                  <StoreCard
                    key={p._id}
                    pokemon={p}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-10">
                <Button
                  type="button"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white shadow-xl disabled:opacity-40"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Anterior
                </Button>

                <span className="font-bold text-lg">
                  {page} / {totalFilteredPages}
                </span>

                <Button
                  type="button"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white shadow-xl disabled:opacity-40"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= totalFilteredPages}
                >
                  Siguiente
                </Button>
              </div>

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
};

export default Store;