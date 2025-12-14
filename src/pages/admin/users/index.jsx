import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUsersCrud } from '../../../hooks/useUsersCrud.js';
import DataTable from '../../../components/DataTable';

const UsersAdmin = () => {
  const { allData, loading, remove, restore } = useUsersCrud();

  const columns = [
    { title: "Apellido y nombre", data: "last_first_name" },
    { title: "Email", data: "email" },
    { title: "Usuario", data: "user_name" },
    { title: "Roles", data: "roles" },
    { title: "Acción", data: "accion" }
  ];

  const data = loading
    ? []
    : allData.map(u => {
      const isDeleted = !!u.deletedAt;

      return {
        _id: u._id,
        last_first_name: (`${u.last_name}, ${u.first_name}`).toUpperCase(),
        email: u.email,
        user_name: u.user_name,
        roles: `
          <ul style="padding-left: 20px; list-style: disc;">
            ${u.roles.map(r => `<li>${r.name}</li>`).join("")}
          </ul>
        `,
        accion: isDeleted
          ? `
            <button
              class="btn-user-restore"
              data-id="${u._id}"
              style="background:#16a34a; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              title="Restaurar"
            >
              <i class='bi bi-arrow-counterclockwise'></i>
            </button>
          `
          : `
          <div style="display:flex; gap:8px;">
            <button
              style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              onclick="window.location.href='/administration/users/${u._id}/show'"
              title="Ver detalles"
            >
              <i class='bi bi-search'></i>
            </button>

            <button
              style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              onclick="window.location.href='/administration/users/${u._id}/edit'"
              title="Editar"
            >
              <i class='bi bi-pen'></i>
            </button>

            <button 
              class="btn-user-delete"
              data-id="${u._id}"
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
      const delBtn = e.target.closest(".btn-user-delete");
      const resBtn = e.target.closest(".btn-user-restore");

      if (delBtn) {
        remove(delBtn.getAttribute("data-id"));
      }

      if (resBtn) {
        restore(resBtn.getAttribute("data-id"));
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [remove, restore]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">Usuarios</h2>

          <Link
            to="/administration/users/create"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl shadow-xl transition"
          >
            Crear usuario
          </Link>
        </div>

        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default UsersAdmin;