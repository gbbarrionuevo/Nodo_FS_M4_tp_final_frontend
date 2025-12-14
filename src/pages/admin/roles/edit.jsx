import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useRolesCrud } from '../../../hooks/useRolesCrud.js';
import { usePermissionsCrud } from '../../../hooks/usePermissionsCrud.js';
import { useSweetAlert } from '../../../context/SweetAlertContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';
import Input from '../../../components/Input.jsx';
import Button from '../../../components/Button.jsx';

const RolesAdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, show, update } = useRolesCrud();
  const { allData: permissionsData } = usePermissionsCrud();
  const { alert } = useSweetAlert();
  const { notify } = useToast();

  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: []
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const r = await show(id);

        setForm({
          name: r.name || "",
          description: r.description || "",
          permissions: r.permissions?.map(p => p._id) || []
        });

      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener el rol";
        notify(msg, "error");
      }
    };

    fetchRole();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePermission = (id) => {
    setForm(prev => {
      const exists = prev.permissions.includes(id);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter(p => p !== id)
          : [...prev.permissions, id]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim() === '') {
      return notify('El nombre es requerido', 'error');
    }
    if (form.description.trim() === '') {
      return notify('La descripción es requerida', 'error');
    }
    if (Array.isArray(form.permissions) ? form.permissions.length === 0 : String(form.permissions).trim() === '') {
      return notify('El permiso es requerido', 'error');
    }

    const result = await alert("Estás seguro de editar el rol?", {
      icon: "warning",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await update(id, form);
      notify("Rol editado correctamente", "success");
      navigate("/administration/roles");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al editar el rol";
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
            <h1 className="text-xl font-semibold">Editar rol</h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
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

              <div className="col-span-1">
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

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">Permisos disponibles</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {permissionsData.map((p) => (
                    <label
                      key={p._id}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(p._id)}
                        onChange={() => togglePermission(p._id)}
                      />
                      {p.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/roles"
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

export default RolesAdminEdit;