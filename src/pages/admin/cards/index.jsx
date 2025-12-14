import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useCardsCrud } from '../../../hooks/useCardsCrud.js';
import DataTable from '../../../components/DataTable';

const CardsAdmin = () => {
  const { hasPermission } = useAuth();
  const { allData, loading, remove } = useCardsCrud();

  const columns = [
    { title: "Nombre", data: "name" },
    { title: "Rareza", data: "rarity" },
    { title: "Stage", data: "stage" },
    { title: "HP", data: "hp" },
    { title: "Acción", data: "accion" }
  ];

  const data = loading
    ? []
    : allData.map(c => {
      return {
        _id: c._id,
        name: c.name,
        rarity: c.rarity,
        stage: c.stage,
        hp: c.hp,
        accion: `
          <div style="display:flex; gap:8px;">
            <button
              style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              onclick="window.location.href='/administration/cards/${c._id}/show'"
              title="Ver detalles"
            >
              <i class='bi bi-search'></i>
            </button>

          ${hasPermission("update:card")
            ? `<button
                  style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
                  onclick="window.location.href='/administration/cards/${c._id}/edit'"
                  title="Editar"
                >
                  <i class='bi bi-pen'></i>
                </button>`
            : ""
          }

          ${hasPermission("delete:card")
            ? `<button
                  class="btn-card-delete"
                  data-id="${c._id}"
                  style="background:#dc2626; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
                  title="Eliminar"
                >
                  <i class='bi bi-x'></i>
                </button>`
            : ""
          }

          </div>
        `
      };
    });

  useEffect(() => {
    const handler = (e) => {
      const delBtn = e.target.closest(".btn-card-delete");

      if (delBtn) {
        remove(delBtn.getAttribute("data-id"));
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [remove]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">
            Cartas
          </h2>
        </div>

        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default CardsAdmin;