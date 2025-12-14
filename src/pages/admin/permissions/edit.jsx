import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { usePermissionsCrud } from '../../../hooks/usePermissionsCrud.js';
import { useSweetAlert } from '../../../context/SweetAlertContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';
import Input from '../../../components/Input.jsx';
import Button from '../../../components/Button.jsx';

const PermissionsAdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, show, update } = usePermissionsCrud();
  const { alert } = useSweetAlert();
  const { notify } = useToast();

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const p = await show(id);

        setForm({
          name: p.name || "",
          description: p.description || ""
        });

      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener el permiso";
        notify(msg, "error");
      }
    };

    fetchPermission();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim() === '') {
      return notify('El nombre es requerido', 'error');
    }
    if (form.description.trim() === '') {
      return notify('La descripción es requerida', 'error');
    }

    const result = await alert("Estás seguro de editar el permiso?", {
      icon: "warning",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await update(id, form);
      notify("Permiso editado correctamente", "success");
      navigate("/administration/permissions");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al editar el permiso";
      notify(msg, "error");
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <PageTransition>
        <div className="flex items-start justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4"
          >
            <h1 className="text-xl font-semibold">Editar permiso</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="w-full col-span-1">
                <label className="block mb-1 text-sm font-medium">Nombre</label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>

              <div className="w-full col-span-1">
                <label className="block mb-1 text-sm font-medium">Descripción</label>
                <Input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/permissions"
                className="w-full text-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow-xl transition"
              >
                Volver
              </Link>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 shadow-xl"
              >
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </PageTransition>
    </>
  );
};

export default PermissionsAdminEdit;