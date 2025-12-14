import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useToast } from '../context/ToastContext.jsx';
import PageTransition from '../components/PageTransition.jsx';
import PokeballLoader from '../components/PokeballLoader.jsx';

const PokemonDetail = () => {
  const { id } = useParams();
  const [poke, setPoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(ENDPOINTS.inventory.show(id));
        setPoke(res.data.card);
      } catch (err) {
        const msg = err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener la carta";
        notify(msg, "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, notify]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-[80vh] py-10">
          <div className="flex items-center justify-between mb-6"></div>
          <div className="flex justify-center items-center min-h-[500px]">
            <PokeballLoader />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!poke) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto mt-20 px-4 text-center">
          <p className="text-red-500 font-semibold text-xl">Pokémon no encontrado</p>
          <div className="mt-6">
            <Link
              to="/inventory"
              className="inline-block px-4 py-2 bg-gray-700 text-white rounded-md"
            >
              Volver al inventario
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const getImageSrc = (img) => {
    if (!img) {
      return "";
    }
    if (typeof img === "string") {
      return img.endsWith(".png") || img.endsWith(".jpg") ? img : `${img}/high.png`;
    }
    return img.high || img.large || img.normal || img.small || "";
  };
  const imageSrc = getImageSrc(poke.image);

  const typeColors = {
    Normal: "bg-gray-400",
    Fuego: "bg-red-500",
    Agua: "bg-blue-500",
    Planta: "bg-green-500",
    Eléctrico: "bg-yellow-400",
    Hielo: "bg-cyan-400",
    Lucha: "bg-orange-700",
    Veneno: "bg-purple-600",
    Tierra: "bg-amber-700",
    Volador: "bg-sky-400",
    Psíquico: "bg-pink-500",
    Bicho: "bg-lime-600",
    Roca: "bg-stone-500",
    Fantasma: "bg-indigo-700",
    Dragón: "bg-indigo-600",
    Siniestro: "bg-gray-700",
    Acero: "bg-slate-400",
    Hada: "bg-pink-400",
  };

  const card3D = `
    transition-transform duration-500 ease-out transform-gpu
    hover:scale-[1.05] hover:rotate-[1deg]
    hover:shadow-xl hover:shadow-yellow-300/20
    relative overflow-hidden group
    after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:to-white/40
    after:opacity-0 group-hover:opacity-40 after:transition-all after:duration-700
  `;

  const typeGradients = {
    Fuego: "from-red-600 via-orange-500 to-yellow-400",
    Agua: "from-blue-600 via-sky-500 to-cyan-300",
    Planta: "from-green-600 via-lime-500 to-yellow-300",
    Eléctrico: "from-yellow-400 via-amber-300 to-orange-400",
    Psíquico: "from-pink-500 via-fuchsia-500 to-violet-500",
    Dragón: "from-purple-600 via-indigo-500 to-blue-400",
    Siniestro: "from-gray-900 via-gray-700 to-gray-500",
    Acero: "from-slate-400 via-gray-300 to-slate-100",
    Hada: "from-pink-400 via-rose-400 to-purple-300",
    Bicho: "from-lime-600 via-green-500 to-yellow-400",
  };

  const gradient = poke.types?.[0] && typeGradients[poke.types[0]]
    ? typeGradients[poke.types[0]]
    : "from-gray-500 to-gray-700";

  const weaknesses = Array.isArray(poke.weaknesses)
    ? poke.weaknesses.map((w) => ({
      type: w.type || "-",
      value: w.value || "-"
    }))
    : [];

  const resistances = Array.isArray(poke.resistances)
    ? poke.resistances.map((r) => ({
      type: r.type || "-",
      value: r.value || "-"
    }))
    : [];

  return (
    <>
      <PageTransition>
        <div className="min-h-[80vh] py-10">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-wide">Detalles de la carta</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex justify-center items-start">
              <div className="flex justify-center md:justify-start">
                <div className={`rounded-3xl border border-white/10 shadow-2xl p-4 bg-linear-to-br ${gradient} ${card3D}`}>
                  <img
                    src={imageSrc}
                    alt={poke.name}
                    className="w-full object-contain drop-shadow-xl" />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <article className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold capitalize text-gray-900 dark:text-white">{poke.name} <span className="text-sm text-gray-400"># {poke.localId || ""}</span></h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {poke.types?.map((t, i) => (
                      <span
                        key={t + "-" + i}
                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${typeColors[t] || "bg-gray-600"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700 dark:text-gray-200">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Serie</p>
                      <p className="font-medium">{poke.set.name ?? "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Stage</p>
                      <p className="font-medium">{poke.stage || "-"}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">HP</p>
                      <p className="font-medium">{poke.hp ?? "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rareza</p>
                      <p className="font-medium">{poke.rarity || "-"}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Rarity</p>
                      <p className="font-medium">{poke.rarity || "-"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ilustrador</p>
                      <p className="font-medium">{poke.illustrator || "-"}</p>
                    </div>
                  </div>
                </div>

                <div className="my-5 border-t border-gray-200 dark:border-gray-700" />

                {poke.abilities && poke.abilities.length > 0 && (
                  <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Habilidades</h4>
                    <div className="space-y-2">
                      {poke.abilities.map((a, i) => {
                        const name = typeof a === "string" ? a : a.name || a.title || "Habilidad";
                        const text = typeof a === "string" ? null : a.text || a.effect || null;
                        return (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                          >
                            <p className="font-medium">{name}</p>
                            {text && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{text}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {weaknesses.length > 0 && (
                  <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Debilidades</h4>
                    <div className="space-y-2">
                      {weaknesses.map((w, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{w.type}</p>
                            </div>
                            <div className="text-right">
                              {w.value ? <p className="font-bold">{w.value}</p> : <p className="text-sm text-gray-500">-</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {poke.attacks && poke.attacks.length > 0 && (
                  <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Ataques</h4>
                    <div className="space-y-2">
                      {poke.attacks.map((atk, i) => {
                        const cost = atk.cost ? (Array.isArray(atk.cost) ? atk.cost.join(" ") : String(atk.cost)) : "";
                        const damage = atk.damage || "";
                        const text = atk.text || atk.effect || "";
                        return (
                          <div
                            key={i}
                            className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-md">{atk.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{cost}</p>
                              </div>
                              <div className="text-right">
                                {damage ? <p className="font-bold">{damage}</p> : <p className="text-sm text-gray-500">-</p>}
                              </div>
                            </div>
                            {text && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {resistances.length > 0 && (
                  <section className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Resistencias</h4>
                    <div className="space-y-2">
                      {resistances.map((r, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{r.type}</p>
                            </div>
                            <div className="text-right">
                              {r.value ? <p className="font-bold">{r.value}</p> : <p className="text-sm text-gray-500">-</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <div className="mt-8 flex justify-end gap-3">
                  <Link to="/inventory" className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-medium"
                  >
                    Volver al inventario
                  </Link>
                </div>
              </article>
            </div>
          </div>

          <div className="mt-6">
            {(poke.flavorText || poke.text || poke.notes) && (
              <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold mb-2">Descripción / Texto de la carta</h4>
                <p className="text-gray-700 dark:text-gray-200">
                  {poke.flavorText || poke.text || poke.notes}
                </p>
              </section>
            )}
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default PokemonDetail;