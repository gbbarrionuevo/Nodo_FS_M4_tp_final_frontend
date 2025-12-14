import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useContactsCrud } from '../../../hooks/useContactsCrud.js';
import DataTable from '../../../components/DataTable';

const ContactsAdmin = () => {
  const { hasPermission } = useAuth();
  const { allData, loading, remove } = useContactsCrud();

  const columns = [
    { title: "Apellido y nombre", data: "name" },
    { title: "Usuario", data: "user" },
    { title: "Acción", data: "accion" }
  ];

  const data = loading
    ? []
    : allData.map(c => {
      return {
        _id: c._id,
        name: (
          ((c.user?.first_name || '') + ', ' + (c.user?.last_name || '')).trim().toUpperCase()
        ) || c.user?.user_name || '-',
        user: c.user?.user_name || "-",
        accion: `
          <div style="display:flex; gap:8px;">
            <button
              style="background:#3b82f6; color:white; padding:4px 8px; border-radius:6px; font-size:12px; cursor:pointer;"
              onclick="window.location.href='/administration/contact/${c._id}/show'"
              title="Ver detalles"
            >
              <i class='bi bi-search'></i>
            </button>

          ${hasPermission("delete:contact")
            ? `<button
                  class="btn-contact-delete"
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
      const delBtn = e.target.closest(".btn-contact-delete");

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
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide">Contactos</h2>
        </div>

        <DataTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default ContactsAdmin;