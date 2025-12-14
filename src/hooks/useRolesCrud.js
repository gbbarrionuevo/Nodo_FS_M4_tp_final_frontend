import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const useRolesCrud = () => {
  const { alert } = useSweetAlert();
  const { notify } = useToast();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const list = async () => {
    setLoading(true);

    try {
      const res = await api.get(ENDPOINTS.roles.list);

      setAllData(res.data || []);
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error cargando roles");
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    try {
      const res = await api.post(ENDPOINTS.roles.create, data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error creando role");
      throw err;
    }
  };

  const show = async (id) => {
    try {
      const res = await api.get(ENDPOINTS.roles.show(id));
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener role");
      throw err;
    }
  };

  const update = async (id, data) => {
    try {
      const res = await api.put(ENDPOINTS.roles.update(id), data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error actualizando role");
      throw err;
    }
  };

  const remove = async (id) => {
    const result = await alert("¿Deseas eliminar este rol?", {
      icon: "warning",
      confirmButtonText: "Eliminar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await api.delete(ENDPOINTS.roles.delete(id));
      notify("Rol eliminado correctamente", "success");
      await list();
      return true;
    } catch (err) {
      notify("Error al eliminar rol", "error");
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error eliminando role");
      return false;
    }
  };

  useEffect(() => {
    list();
  }, []);

  return { allData, loading, create, show, update, remove };
};