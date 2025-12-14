import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import PageTransition from '../components/PageTransition.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { notify } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email.trim() === '') {
      return notify('El email es requerido', 'error');
    }
    if (form.password.trim() === '') {
      return notify('La contraseña es requerida', 'error');
    }

    try {
      setLoading(true);

      await login(form);
      navigate("/home");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al iniciar sesión";
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
              className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4"
            >
              <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">Iniciar sesión</h1>

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
                {loading ? 'Cargando...' : 'Ingresar'}
              </Button>

              <p className="text-center text-sm text-gray-700 dark:text-gray-300">
                ¿No tenés cuenta?{" "}
                <a href="/register" className="text-blue-600 dark:text-blue-400 font-medium">
                  Registrate
                </a>
              </p>
            </form>
          </div>
        </AuthLayout>
      </PageTransition>
    </>
  );
}