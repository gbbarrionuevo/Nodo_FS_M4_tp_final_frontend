import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContactsCrud } from '../../../hooks/useContactsCrud.js';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';

const ContactsAdminShow = () => {
  const { id } = useParams();
  const { loading, show } = useContactsCrud();
  const { notify } = useToast();

  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const c = await show(id);

        const fullName = (
          ((c.user?.first_name || "") + " " + (c.user?.last_name || "")).trim().toUpperCase()
        ) || c.user?.user_name || "-";

        setContact({
          name: fullName,
          email: c.user?.email || "-",
          username: c.user?.user_name || "-",
          message: c.message || "-",
        });
      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener el contacto";
        notify(msg, "error");
      }
    };

    fetchContact();
  }, [show, notify, id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <PageTransition>
        <div className="flex items-start justify-center p-4">
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4">
            <h1 className="text-xl font-semibold">Detalle del contacto</h1>

            {contact && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-base">{contact.name}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{contact.email}</p>
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Usuario</p>
                  <p className="text-base">{contact.username}</p>
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Mensaje</p>
                  <p className="text-base">{contact.message}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/contact"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow transition w-full text-center"
              >
                Volver
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default ContactsAdminShow;