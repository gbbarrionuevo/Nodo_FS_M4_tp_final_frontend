import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import { usePermissionsCrud } from '../../../hooks/usePermissionsCrud.js';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';

const PermissionsAdminShow = () => {
  const { hasPermission } = useAuth();
  const { id } = useParams();
  const { loading, show } = usePermissionsCrud();
  const { notify } = useToast();

  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const u = await show(id);
        setPermission(u);
      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener el permiso";
        notify(msg, "error");
      }
    };

    fetchPermission();
  }, [show, notify, id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <PageTransition>
        <div className="flex items-start justify-center p-4">
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4">
            <h1 className="text-xl font-semibold">Detalle del permiso</h1>

            {permission && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-base">{permission.name}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Descripción</p>
                  <p className="text-base">{permission.description}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/permissions"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow transition w-full text-center"
              >
                Volver
              </Link>

              {hasPermission("update:permission") && (
                <Link
                  to={`/administration/permissions/${id}/edit`}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow transition w-full text-center"
                >
                  Editar
                </Link>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default PermissionsAdminShow;