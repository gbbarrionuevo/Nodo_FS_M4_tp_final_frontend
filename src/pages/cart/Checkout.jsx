import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { ENDPOINTS } from '../../api/endpoints.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useSweetAlert } from '../../context/SweetAlertContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';

const Checkout = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { alert } = useSweetAlert();
  const { notify } = useToast();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [payment, setPayment] = useState({
    type: "Visa",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    holderName: "",
    holderLastName: "",
    installments: 1
  });

  const maskCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumber = (e) => {
    e.target.value = maskCardNumber(e.target.value);
    handleChange(e);
  };

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (payment.type.trim() === '') {
      return notify('El tipo de tarjeta es requerido', 'error');
    }
    if (payment.cardNumber.trim() === '') {
      return notify('El número de tarjeta es requerido', 'error');
    }
    if (payment.expirationDate.trim() === '') {
      return notify('El fecha de caducidad es requerida', 'error');
    }
    if (payment.securityCode.trim() === '') {
      return notify('El código de seguridad es requerido', 'error');
    }
    if (payment.holderName.trim() === '') {
      return notify('El nombre es requerido', 'error');
    }
    if (payment.holderLastName.trim() === '') {
      return notify('El apellido es requerido', 'error');
    }

    if (!user.direccion) {
      const result = await alert("Para confirmar la compra debés tener una dirección para el envío de los productos", {
        icon: "warning",
        confirmButtonText: "Ir a perfil",
      });

      if (result.isConfirmed) {
        navigate("/profile");
      }

      return;
    }

    const result = await alert("¿Deseas confirmar la compra?", {
      icon: "warning",
      confirmButtonText: "Confirmar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    const payload = {
      payment: {
        ...payment,
        subtotal: cart.total,
        interests: 0,
        total: cart.total
      },
      status: "Approved"
    };

    try {
      setLoading(true);

      await api.post(ENDPOINTS.purchases.create, payload);
      clearCart();
      navigate("/cart/confirmation");
    } catch (err) {
      console.error("Error creando compra:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8 p-10 items-start">

          <section className="lg:col-span-2 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              <i className="bi bi-credit-card"></i> Método de pago
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Tipo de tarjeta</label>
                <select
                  name="type"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                >
                  <option>Visa</option>
                  <option>Mastercard</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block font-semibold mb-1">Número de tarjeta</label>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  onChange={handleCardNumber}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Fecha de caducidad</label>
                <Input
                  type="month"
                  name="expirationDate"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Código de seguridad</label>
                <Input
                  type="password"
                  name="securityCode"
                  placeholder="***"
                  value={payment.securityCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleChange({ target: { name: "securityCode", value } });
                  }}
                  className="w-full"
                  minLength="3"
                  maxLength="4"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Nombre del titular</label>
                <Input
                  type="text"
                  name="holderName"
                  placeholder="Juan"
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Apellido del titular</label>
                <Input
                  type="text"
                  name="holderLastName"
                  placeholder="Pérez"
                  onChange={handleChange}
                  className="w-full"
                  minLength="3"
                  maxLength="90"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-semibold mb-1">Cuotas</label>
                <select
                  name="installments"
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                  required
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <aside className="h-fit bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resumen de compra</h3>

            <div className="space-y-2 text-lg font-medium dark:text-white">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cart?.total.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Envío:</span>
                <span>$0.00</span>
              </p>
              <hr className="my-3 border-gray-300 dark:border-gray-600" />
              <p className="flex justify-between text-xl font-bold">
                <span>Total final:</span>
                <span className="text-green-600 dark:text-green-400">${cart?.total.toFixed(2)}</span>
              </p>
            </div>

            <Button
              type="submit"
              className="block w-full bg-red-600 hover:bg-red-700 text-white disabled:opacity-40 text-center py-3 rounded-xl shadow-xl font-bold mt-4"
              disabled={loading}
            >
              {loading ? 'Confirmando' : 'Confirmar'} pago
            </Button>

            <Link
              to="/cart/detail"
              className="block w-full bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-40 text-center py-3 rounded-xl shadow-xl font-bold mt-4 transition"
              disabled={loading}
            >
              Volver al carrito
            </Link>

          </aside>
        </div>
      </form>
    </>
  );
};

export default Checkout;