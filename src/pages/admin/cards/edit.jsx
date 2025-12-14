import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCardsCrud } from '../../../hooks/useCardsCrud.js';
import { useSweetAlert } from '../../../context/SweetAlertContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';
import Input from '../../../components/Input.jsx';
import Button from '../../../components/Button.jsx';

const CardsAdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, show, update } = useCardsCrud();
  const { alert } = useSweetAlert();
  const { notify } = useToast();

  const [form, setForm] = useState({
    price: "",
    quantity: ""
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const c = await show(id);

        setForm({
          price: c.price || "",
          quantity: c.quantity || ""
        });

      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener la carta";
        notify(msg, "error");
      }
    };

    fetchCard();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.price > 0) {
      return notify('El precio es requerido', 'error');
    }
    if (form.quantity > 0) {
      return notify('El stock es requerido', 'error');
    }

    const result = await alert("Estás seguro de editar la carta?", {
      icon: "warning",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await update(id, form);
      notify("Carta editada correctamente", "success");
      navigate("/administration/cards");
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al editar la carta";
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
            <h1 className="text-xl font-semibold">Editar carta</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full col-span-1">
                <label className="block mb-1 text-sm font-medium">Precio</label>
                <Input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="w-full col-span-1">
                <label className="block mb-1 text-sm font-medium">Stock</label>
                <Input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/cards"
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

export default CardsAdminEdit;