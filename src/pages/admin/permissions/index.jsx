import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePermissionsCrud } from '../../../hooks/usePermissionsCrud.js';
import DataTable from '../../../components/DataTable';

const PermissionsAdmin = () => {
  const { allData, loading, remove } = usePermissionsCrud();
  
  const columns = [
    { title: "Nombre", data: "name" },
    { title: "Descripción", data: "description" },
    { title: "Acción", data: "accion" }
  ];

  const data = loading
    ? []
    : allData.map(p => {
      return {
        _id: p._id,
        name: p.name,
        description: p.description,
        accion: `
          <div style="display:flex; gap:8px;">
            <button
              style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              onclick="window.location.href='/administration/permissions/${p._id}/show'"
              title="Ver detalles"
            >
              <i class='bi bi-search'></i>
            </button>

            <button
              style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              onclick="window.location.href='/administration/permissions/${p._id}/edit'"
              title="Editar"
            >
              <i class='bi bi-pen'></i>
            </button>

            <button
              class="btn-permission-delete"
              data-id="${p._id}"
              style="background:#dc2626; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              title="Eliminar"
            >
              <i class='bi bi-x'></i>
            </button>
          </div>
        `
      };
    });

  useEffect(() => {
    const handler = (e) => {
      const delBtn = e.target.closest(".btn-permission-delete");

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
            Permisos
          </h2>

          <Link
            to="/administration/permissions/create"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-xl transition"
          >
            Crear permiso
          </Link>
        </div>

        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default PermissionsAdmin;