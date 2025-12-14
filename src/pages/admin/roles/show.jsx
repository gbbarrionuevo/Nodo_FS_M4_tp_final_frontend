import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRolesCrud } from '../../../hooks/useRolesCrud.js';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';

const RolesAdminShow = () => {
  const { id } = useParams();
  const { loading, show } = useRolesCrud();
  const { notify } = useToast();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const u = await show(id);
        setRole(u);
      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener el rol";
        notify(msg, "error");
      }
    };

    fetchRole();
  }, [show, notify, id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <PageTransition>
        <div className="flex items-start justify-center p-4">
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4">
            <h1 className="text-xl font-semibold">Detalle del rol</h1>

            {role && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-base">{role.name}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Descripción</p>
                  <p className="text-base">{role.description}</p>
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Roles</p>
                  <ul className="list-disc pl-5">
                    {role.permissions?.map((p) => (
                      <li key={p._id}>{p.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/roles"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow transition w-full text-center"
              >
                Volver
              </Link>

              <Link
                to={`/administration/roles/${id}/edit`}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow transition w-full text-center"
              >
                Editar
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default RolesAdminShow;