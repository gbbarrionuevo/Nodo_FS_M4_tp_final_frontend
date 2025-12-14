import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useUsersCrud } from '../hooks/useUsersCrud.js';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import PageTransition from '../components/PageTransition.jsx';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { updateAvatar } = useUsersCrud();
  const { alert } = useSweetAlert();
  const { notify } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    direccion: user?.direccion || "",
    user_name: user?.user_name || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
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
    if (form.user_name.trim() === '') {
      return notify('El usuario es requerido', 'error');
    }

    const confirm = await alert("¿Deseas guardar los cambios?", {
      icon: "warning",
      confirmButtonText: "Confirmar"
    });

    if (!confirm.isConfirmed) {
      return;
    }

    try {
      setLoading(true);

      const res = await api.put(ENDPOINTS.profile.update(user._id), form);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      notify("Perfil guardado correctamente", "success");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al guardar el perfil";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const confirm = await alert("¿Deseas cambiar tu contraseña?", {
      icon: "warning",
      confirmButtonText: "Continuar"
    });

    if (!confirm.isConfirmed) {
      return;
    }

    const modal = await alert("Cambiar contraseña", {
      icon: "info",
      confirmButtonText: "Actualizar",
      html: `
        <div class="space-y-2">
          <input id="old_pass" type="password" placeholder="Contraseña actual" class="block w-full px-3 py-2 shadow-lg rounded-lg bg-gray-200 text-gray-700 focus:ring focus:ring-opacity-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-200" required />
          <input id="new_pass" type="password" placeholder="Nueva contraseña" class="block w-full px-3 py-2 shadow-lg rounded-lg bg-gray-200 text-gray-700 focus:ring focus:ring-opacity-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-200" required />
          <input id="repeat_pass" type="password" placeholder="Repetir nueva contraseña" class="block w-full px-3 py-2 shadow-lg rounded-lg bg-gray-200 text-gray-700 focus:ring focus:ring-opacity-50 border-gray-300 dark:bg-gray-700 dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-200" required />
        </div>
      `,
      preConfirm: () => {
        const old_password = document.getElementById("old_pass").value;
        const new_password = document.getElementById("new_pass").value;
        const repeat_password = document.getElementById("repeat_pass").value;

        if (!old_password || !new_password || !repeat_password) {
          return false;
        }

        if (new_password !== repeat_password) {
          return false;
        }

        return { old_password, new_password, repeat_password };
      }
    });

    if (!modal.value) {
      return notify("Completa todos los campos correctamente", "error");
    }

    const { old_password, new_password, repeat_password } = modal.value;

    try {
      setLoading(true);

      await api.put(ENDPOINTS.profile.changePassword(user._id), { old_password, new_password, repeat_password });

      notify("Contraseña actualizada correctamente", "success");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al actualizar la contraseña";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTransition>
        <div className="min-h-[80vh] py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Perfil</h2>
          </div>

          <div className="flex min-h-[70vh] max-h-[70vh] bg-gray-100 dark:bg-gray-900">
            <div className="w-80 p-5 me-6 space-y-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow">
              <div className="flex flex-col items-center justify-center text-center h-140 py-6">
                <img
                  src={user.avatar ? ENDPOINTS.static.avatar(user.avatar) :
                    `https://ui-avatars.com/api/?name=${user.first_name || "User"}&background=dc2626&color=fff`}
                  alt="Avatar"
                  className="w-48 h-w-48 rounded-full object-cover border border-gray-300 shadow"
                />

                <h2 className="text-xl font-semibold">
                  {user?.first_name} {user?.last_name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>

                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (!e.target.files[0]) {
                      return;
                    }

                    try {
                      setLoading(true);

                      const res = await updateAvatar(e.target.files[0]);

                      setUser(res.user);
                      localStorage.setItem("user", JSON.stringify(res.user));

                      notify("Avatar actualizado", "success");
                    } catch (err) {
                      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al subir avatar";
                      notify(msg, "error");
                    } finally {
                      setLoading(false);
                    }
                  }}
                />

                <Button
                  type="button"
                  className="mt-4 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                  onClick={() => document.getElementById("avatarInput").click()}
                >
                  Cambiar avatar
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow text-gray-900 dark:text-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block mb-1 text-sm">Nombre</label>
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
                  <label className="block mb-1 text-sm">Apellido</label>
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
                  <label className="block mb-1 text-sm">Email</label>
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

                <div className="col-span-1">
                  <label className="block mb-1 text-sm">Usuario</label>
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
                  <label className="block mb-1 text-sm">Contraseña</label>
                  <Button
                    type="button"
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white shadow-xl"
                    onClick={handleChangePassword}
                  >
                    Cambiar contraseña
                  </Button>
                </div>

                <div className="col-span-2">
                  <hr className="my-4 border-gray-300 dark:border-gray-700" />
                </div>

                <div className='space-x-2'>
                  <Link
                    to="/home"
                    className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-xl shadow-xl transition"
                  >
                    Volver al Home
                  </Link>

                  <Button
                    type="button"
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white disabled:opacity-40 rounded-lg"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? "Guardando..." : "Guardar"}
                  </Button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Profile;