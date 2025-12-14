import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCardsCrud } from '../../../hooks/useCardsCrud.js';
import { useToast } from '../../../context/ToastContext.jsx';
import PageTransition from '../../../components/PageTransition.jsx';

const CardsAdminShow = () => {
  const { id } = useParams();
  const { loading, show } = useCardsCrud();
  const { notify } = useToast();

  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const c = await show(id);
        setCard(c);
      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener la carta";
        notify(msg, "error");
      }
    };

    fetchCard();
  }, [show, notify, id]);

  if (!card) {
    return <p>Cargando...</p>;
  }

  const weaknesses = Array.isArray(card.weaknesses)
    ? card.weaknesses.map((w) => ({
      type: w.type || "-",
      value: w.value || "-"
    }))
    : [];

  const resistances = Array.isArray(card.resistances)
    ? card.resistances.map((r) => ({
      type: r.type || "-",
      value: r.value || "-"
    }))
    : [];

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <PageTransition>
        <div className="flex items-start justify-center p-4">
          <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-xl space-y-4">
            <h1 className="text-xl font-semibold">Detalle de la carta</h1>

            {card && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-base">{card.name}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Categoria</p>
                  <p className="text-base">{card.category}</p>
                </div>

                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Imagen</p>
                  <p className="text-base">
                    <a
                      className="text-blue-400 underline"
                      href={`${card.image}/high.png`}
                      target="_blank"
                    >
                      {card.image}
                    </a>
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Ilustrador</p>
                  <p className="text-base">{card.illustrator ?? '-'}</p>
                </div>

                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Rareza</p>
                  <p className="text-base">{card.rarity ?? '-'}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Hp</p>
                  <p className="text-base">{card.hp ?? '-'}</p>
                </div>

                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Stage</p>
                  <p className="text-base">{card.stage ?? '-'}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Serie</p>
                  <p className="text-base">{card.set.name ?? '-'}</p>
                </div>

                {card.abilities && card.abilities.length > 0 && (
                  <div className="col-span-1 sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Habilidades</p>
                    {card.abilities.map((a, i) => {
                      const name = typeof a === "string" ? a : a.name || a.title || "Habilidad";
                      const text = typeof a === "string" ? null : a.text || a.effect || null;
                      return (
                        <p key={i} className="text-base">{name} {text ? text : "-"}</p>
                      );
                    })}
                  </div>
                )}

                {weaknesses.length > 0 && (
                  <div className="col-span-1 sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Debilidades</p>
                    {weaknesses.map((w, i) => (
                      <p key={i} className="text-base">{w.type} {w.value ? w.value : "-"}</p>
                    ))}
                  </div>
                )}

                {card.attacks && card.attacks.length > 0 && (
                  <div className="col-span-1 sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Ataques</p>
                    {card.attacks.map((atk, i) => {
                      const cost = atk.cost ? (Array.isArray(atk.cost) ? atk.cost.join(" ") : String(atk.cost)) : "";
                      const damage = atk.damage || "";
                      const text = atk.text || atk.effect || "";
                      return (
                        <div key={i}>
                          <p className="text-base">{atk.name} {cost} - {damage ? damage : "-"}</p>
                          {text && <p className="text-base">{text}</p>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {resistances.length > 0 && (
                  <div className="col-span-1 sm:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Resistencias</p>
                    {resistances.map((r, i) => (
                      <p key={i} className="text-base">{r.type} {r.value ? r.value : "-"}</p>
                    ))}
                  </div>
                )}

                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Precio</p>
                  <p className="text-base">${card.price ?? '-'}</p>
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium text-gray-500">Stock</p>
                  <p className="text-base">{card.quantity ?? '-'}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Link
                to="/administration/cards"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl shadow transition w-full text-center"
              >
                Volver
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default CardsAdminShow;