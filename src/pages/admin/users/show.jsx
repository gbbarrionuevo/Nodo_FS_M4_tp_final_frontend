import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUsersCrud } from '../../../hooks/useUsersCrud.js';
import { ENDPOINTS } from '../../../api/endpoints.js';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';

const UsersAdminShow = () => {
  const { id } = useParams();
  const { loading, show } = useUsersCrud();
  const { notify } = useToast();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await show(id);
        setUser(u);
      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener el usuario";
        notify(msg, "error");
      }
    };

    fetchUser();
  }, [show, notify, id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <PageTransition>
        <div className="flex items-start justify-center p-4">
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4">
            <h1 className="text-xl font-semibold">Detalle del usuario</h1>

            {user && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8">
                <div className="flex flex-col items-center sm:col-span-1 sm:row-span-4">
                  <img
                    src={user.avatar ? ENDPOINTS.static.avatar(user.avatar) :
                      `https://ui-avatars.com/api/?name=${user.first_name || "User"}&background=dc2626&color=fff`}
                    alt="Avatar"
                    className="w-48 h-48 rounded-full object-cover border border-gray-300 shadow"
                  />
                  <p className="mt-3 text-lg font-semibold text-center">
                    {user.user_name}
                  </p>
                </div>
                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-base">{user.first_name}</p>
                </div>
                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">Apellido</p>
                  <p className="text-base">{user.last_name}</p>
                </div>
                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base break-all">{user.email}</p>
                </div>
                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">Roles</p>
                  <ul className="list-disc pl-5">
                    {user.roles?.map((r) => (
                      <li key={r._id}>{r.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">Dirección</p>
                  <p className="text-base">{user.direccion ?? "-"}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/users"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow transition w-full text-center"
              >
                Volver
              </Link>

              <Link
                to={`/administration/users/${id}/edit`}
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

export default UsersAdminShow;