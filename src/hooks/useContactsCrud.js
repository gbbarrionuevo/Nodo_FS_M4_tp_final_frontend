import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const useContactsCrud = () => {
  const { alert } = useSweetAlert();
  const { notify } = useToast();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const list = async () => {
    setLoading(true);

    try {
      const res = await api.get(ENDPOINTS.contacts.list);

      setAllData(res.data || []);
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error cargando contacts");
    } finally {
      setLoading(false);
    }
  };

  const show = async (id) => {
    try {
      const res = await api.get(ENDPOINTS.contacts.show(id));
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener contact");
      throw err;
    }
  };

  const remove = async (id) => {
    const result = await alert("¿Deseas eliminar este contacto?", {
      icon: "warning",
      confirmButtonText: "Eliminar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await api.delete(ENDPOINTS.contacts.delete(id));
      notify("Contacto eliminado correctamente", "success");
      await list();
      return true;
    } catch (err) {
      notify("Error al eliminar contacto", "error");
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error eliminando contact");
      return false;
    }
  };

  useEffect(() => {
    list();
  }, []);

  return { allData, loading, show, remove };
};