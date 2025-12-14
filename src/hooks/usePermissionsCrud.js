import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const usePermissionsCrud = () => {
  const { alert } = useSweetAlert();
  const { notify } = useToast();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const list = async () => {
    setLoading(true);

    try {
      const res = await api.get(ENDPOINTS.permissions.list);

      setAllData(res.data || []);
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error listando permissions");
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    try {
      const res = await api.post(ENDPOINTS.permissions.create, data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error creando permission");
      throw err;
    }
  };

  const show = async (id) => {
    try {
      const res = await api.get(ENDPOINTS.permissions.show(id));
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener permission");
      throw err;
    }
  };

  const update = async (id, data) => {
    try {
      const res = await api.put(ENDPOINTS.permissions.update(id), data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error actualizando permission");
      throw err;
    }
  };

  const remove = async (id) => {
    const result = await alert("¿Deseas eliminar este permiso?", {
      icon: "warning",
      confirmButtonText: "Eliminar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await api.delete(ENDPOINTS.permissions.delete(id));
      notify("Permiso eliminado correctamente", "success");
      await list();
      return true;
    } catch (err) {
      notify("Error al eliminar permiso", "error");
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error eliminando permission");
      return false;
    }
  };

  useEffect(() => {
    list();
  }, []);

  return { allData, loading, create, show, update, remove };
};