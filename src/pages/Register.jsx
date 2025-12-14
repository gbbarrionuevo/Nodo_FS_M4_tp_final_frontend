import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import PageTransition from '../components/PageTransition.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { alert } = useSweetAlert();
  const { notify } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    direccion: "",
    avatar: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.user_name.trim() === '') {
      return notify('El usuario es requerido', 'error');
    }
    if (form.email.trim() === '') {
      return notify('El email es requerido', 'error');
    }
    if (form.first_name.trim() === '') {
      return notify('El nombre es requerido', 'error');
    }
    if (form.last_name.trim() === '') {
      return notify('El apellido es requerido', 'error');
    }
    if (form.password.trim() === '') {
      return notify('La contraseña es requerida', 'error');
    }
    
    const result = await alert("Estás seguro de registrarte?", {
      icon: "warning",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      setLoading(true);

      await register(form);
      navigate("/home");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al registrarte";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTransition>
        <AuthLayout>
          <div className="flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmit}
              className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4"
            >
              <h1 className="text-2xl font-semibold text-center">Registrarse</h1>

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

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-40 px-6 py-2 shadow-xl"
                disabled={loading}
              >
                {loading ? 'Creando' : 'Crear'} cuenta
              </Button>

              <p className="text-center text-sm">
                ¿Ya tenés cuenta?{" "}
                <a href="/login" className="text-blue-600 dark:text-blue-400 font-medium">
                  Iniciar sesión
                </a>
              </p>
            </form>
          </div>
        </AuthLayout>
      </PageTransition>
    </>
  );
}