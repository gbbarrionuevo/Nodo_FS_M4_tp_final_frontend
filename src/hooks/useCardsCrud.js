import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const useCardsCrud = () => {
  const { alert } = useSweetAlert();
  const { notify } = useToast();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const list = async () => {
    setLoading(true);

    try {
      const res = await api.get(ENDPOINTS.cards.list);

      setAllData(res.data || []);
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error cargando cards");
    } finally {
      setLoading(false);
    }
  };

  const show = async (id) => {
    try {
      const res = await api.get(ENDPOINTS.cards.show(id));
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener card");
      throw err;
    }
  };

  const update = async (id, data) => {
    try {
      const res = await api.put(ENDPOINTS.cards.update(id), data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error actualizando card");
      throw err;
    }
  };

  const remove = async (id) => {
    const result = await alert("¿Deseas eliminar esta carta?", {
      icon: "warning",
      confirmButtonText: "Eliminar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await api.delete(ENDPOINTS.cards.delete(id));
      notify("Carta eliminada correctamente", "success");
      await list();
      return true;
    } catch (err) {
      notify("Error al eliminar carta", "error");
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error eliminando card");
      return false;
    }
  };

  useEffect(() => {
    list();
  }, []);

  return { allData, loading, show, update, remove };
};