import { useState } from 'react';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints.js';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import Button from '../components/Button.jsx';

const Contact = () => {
  const { alert } = useSweetAlert();
  const { notify } = useToast();
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      return notify("El mensaje es requerido", "error");
    }

    const result = await alert("Estás seguro de enviar el mensaje?", {
      icon: "warning",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      setLoading(true);

      await api.post(ENDPOINTS.contacts.create, { message });

      notify("¡Gracias por tu mensaje! Te respondemos pronto.", "success");
      setMessage("");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al enviar el mensaje";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full max-w-5xl mx-auto px-6 py-16 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Contacto</h2>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">Si tenés consultas, ideas o propuestas, estamos para escucharte.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 leading-relaxed text-lg text-gray-700 dark:text-gray-300">
            <p>Podés usar este formulario para enviar dudas, colaboraciones o sugerencias relacionadas con el proyecto y futuros animes.</p>

            <p>Estamos creando algo grande, y nos encantaría que seas parte del camino.</p>

            <p>Si querés trabajar con nosotros, ofrecer arte, desarrollo o ideas para expansión, contanos más abajo — leemos todo.</p>

            <p className="text-sm opacity-70 mt-6">Tiempo de respuesta estimado: 24-72hs.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 rounded-xl backdrop-blur-md shadow-xl border bg-white/60 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700 transition-all duration-300"
          >
            <div>
              <label className="text-sm opacity-80">Mensaje</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                className="w-full px-4 py-2 mt-1 rounded-md outline-none bg-gray-200 dark:bg-gray-900 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:border-gray-500 dark:focus:border-gray-400 transition-all"
                placeholder="Contame qué tenés en mente..."
              />
            </div>

            <Button
              type="submit"
              className="w-full py-2 font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-40 shadow-xl"
              disabled={loading}
            >
              {loading ? 'Enviando' : 'Enviar'} mensaje
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;