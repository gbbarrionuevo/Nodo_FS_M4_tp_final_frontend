import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useRolesCrud } from '../../../hooks/useRolesCrud.js';
import DataTable from '../../../components/DataTable';

const RolesAdmin = () => {
  const { hasPermission } = useAuth();
  const { allData, loading, remove } = useRolesCrud();

  const columns = [
    { title: "Nombre", data: "name" },
    { title: "Descripción", data: "description" },
    { title: "Permisos", data: "permissions" },
    { title: "Acción", data: "accion" }
  ];

  const data = loading
    ? []
    : allData.map(r => {
      return {
        _id: r._id,
        name: r.name,
        description: r.description,
        permissions: `
          <ul style="padding-left: 20px; list-style: disc;">
            ${r.permissions.map(p => `<li>${p.name}</li>`).join("")}
          </ul>
        `,
        accion: `
          <div style="display:flex; gap:8px;">
            <button
              style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              onclick="window.location.href='/administration/roles/${r._id}/show'"
              title="Ver detalles"
            >
              <i class='bi bi-search'></i>
            </button>

          ${hasPermission("update:role")
            ? `<button
                  style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
                  onclick="window.location.href='/administration/roles/${r._id}/edit'"
                  title="Editar"
                >
                  <i class='bi bi-pen'></i>
                </button>`
            : ""
          }

          ${hasPermission("delete:role")
            ? `<button
                  class="btn-role-delete"
                  data-id="${r._id}"
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
      const delBtn = e.target.closest(".btn-role-delete");

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
            Roles
          </h2>

          {hasPermission("create:role") && (
            <Link
              to="/administration/roles/create"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-xl transition"
            >
              Crear rol
            </Link>
          )}
        </div>

        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default RolesAdmin;