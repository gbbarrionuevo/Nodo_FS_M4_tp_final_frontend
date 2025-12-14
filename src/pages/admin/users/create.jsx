import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUsersCrud } from '../../../hooks/useUsersCrud.js';
import { useRolesCrud } from '../../../hooks/useRolesCrud.js';
import { useSweetAlert } from '../../../context/SweetAlertContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';
import Input from '../../../components/Input.jsx';
import Button from '../../../components/Button.jsx';

const UsersAdminCreate = () => {
  const navigate = useNavigate();
  const { create } = useUsersCrud();
  const { allData: rolesData } = useRolesCrud();
  const { alert } = useSweetAlert();
  const { notify } = useToast();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    direccion: "",
    avatar: "",
    roles: [],
    user_name: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleRole = (roleName) => {
    setForm(prev => {
      const exists = prev.roles.includes(roleName);
      return {
        ...prev,
        roles: exists
          ? prev.roles.filter(r => r !== roleName)
          : [...prev.roles, roleName]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.first_name.trim() === '') {
      return notify('El nombre es requerido', 'error');
    }
    if (form.last_name.trim() === '') {
      return notify('El apellido es requerido', 'error');
    }
    if (form.email.trim() === '') {
      return notify('El email es requerido', 'error');
    }
    if (Array.isArray(form.roles) ? form.roles.length === 0 : String(form.roles).trim() === '') {
      return notify('El rol es requerido', 'error');
    }
    if (form.user_name.trim() === '') {
      return notify('El usuario es requerido', 'error');
    }
    if (form.password.trim() === '') {
      return notify('La contraseña es requerida', 'error');
    }

    const result = await alert("Estás seguro de crear el usuario?", {
      icon: "warning",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await create(form);
      notify("Usuario creado correctamente", "success");
      navigate("/administration/users");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al crear el usuario";
      notify(msg, "error");
    }
  };

  return (
    <>
      <PageTransition>
        <div className="flex items-start justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4"
          >
            <h1 className="text-xl font-semibold">Crear usuario</h1>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="col-span-1">
                <label className="block mb-1 text-sm font-medium">Nombre</label>
                <Input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-1 text-sm font-medium">Apellido</label>
                <Input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-1 text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-1 text-sm font-medium">Dirección (opcional)</label>
                <Input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  className="w-full"
                  maxLength="255"
                  required={false}
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">Roles disponibles</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rolesData.map(role => (
                    <label
                      key={role._id}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={form.roles.includes(role.name)}
                        onChange={() => toggleRole(role.name)}
                      />
                      {role.name}
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block mb-1 text-sm font-medium">Usuario</label>
                <Input
                  type="text"
                  name="user_name"
                  value={form.user_name}
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-1 text-sm font-medium">Contraseña</label>
                <Input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/users"
                className="w-full text-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow-xl transition"
              >
                Volver
              </Link>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 shadow-xl"
              >
                Crear
              </Button>
            </div>
          </form>
        </div>
      </PageTransition>
    </>
  );
};

export default UsersAdminCreate;