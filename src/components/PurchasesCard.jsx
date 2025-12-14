import { useState } from 'react';
import PageTransition from './PageTransition.jsx';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from './Button.jsx';

const PurchasesCard = ({ item, purchase }) => {
  const [open, setOpen] = useState(false);
  const cards = purchase.cards;
  const payment = purchase.payment;

  const date = parseISO(purchase.createdAt);
  const formattedDate = format(date, 'dd/MM/yyyy HH:mm', { locale: es });

  return (
    <>
      <PageTransition>
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-6 p-6 w-full mx-auto transition-all duration-300">
          <Button
            type="button"
            className="w-full flex justify-between items-center text-left"
            onClick={() => setOpen(!open)}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Compra <span className="text-[16px] text-gray-400">#{item + 1} | {formattedDate}</span>
            </h2>

            <i className={`bi ${open ? "bi-chevron-up" : "bi-chevron-down"} text-2xl text-gray-900 dark:text-gray-200 transition-transform`} />
          </Button>

          <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />

            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Cartas adquiridas</h3>

            <div className="space-y-3">
              {cards?.map(item => (
                <div key={item.card._id} className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl">
                  <img src={`${item.card.image}/high.png`} className="w-16 h-20 object-cover rounded-lg shadow-md" />

                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-semibold">{item.card.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.card.rarity} • HP {item.card.hp}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Tipo: {item.card.types.join(", ")}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">x{item.quantity}</p>
                    <p className="text-yellow-500 font-bold text-lg">${item.subtotal.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-gray-900/5 dark:bg-gray-700/40 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Método de pago</h3>

              <p className="text-gray-900 dark:text-gray-200">
                <strong>Tarjeta:</strong> {payment.type} **** **** **** {payment.cardNumber.slice(-4)}
              </p>
              <p className="text-gray-900 dark:text-gray-200">
                <strong>Titular:</strong> {payment.holderLastName}, {payment.holderName}
              </p>

              <hr className="my-3 border-gray-300 dark:border-gray-600" />

              <p className="text-gray-900 dark:text-gray-200">
                <strong>Subtotal:</strong> ${payment.subtotal}
              </p>
              <p className="text-gray-900 dark:text-gray-200">
                <strong>Intereses:</strong> {payment.interests}%
              </p>
              <p className="text-gray-900 dark:text-gray-200">
                <strong>Cuotas:</strong> {payment.installments || 1}
              </p>

              <p className="text-yellow-400 font-bold text-2xl mt-2">Total final: ${payment.total.toFixed(2)}</p>
            </div>

          </div>
        </article>
      </PageTransition>
    </>
  );
};

export default PurchasesCard;