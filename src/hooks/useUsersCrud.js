import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';
import { useSweetAlert } from '../context/SweetAlertContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export const useUsersCrud = () => {
  const { alert } = useSweetAlert();
  const { notify } = useToast();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const list = async () => {
    setLoading(true);
    try {
      const res = await api.get(ENDPOINTS.users.list);
      setAllData(res.data || []);
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error listando users");
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    try {
      const res = await api.post(ENDPOINTS.users.create, data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error creando user");
      throw err;
    }
  };

  const show = async (id) => {
    try {
      const res = await api.get(ENDPOINTS.users.show(id));
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error al obtener user");
      throw err;
    }
  };

  const update = async (id, data) => {
    try {
      const res = await api.put(ENDPOINTS.users.update(id), data);
      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error actualizando user");
      throw err;
    }
  };

  const remove = async (id) => {
    const result = await alert("¿Deseas eliminar este usuario?", {
      icon: "warning",
      confirmButtonText: "Eliminar",
    });

    if (!result.isConfirmed) {
      return false;
    }

    try {
      await api.delete(ENDPOINTS.users.delete(id));
      notify("Usuario eliminado correctamente", "success");
      await list();
      return true;
    } catch (err) {
      notify("Error al eliminar usuario", "error");
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error eliminando user");
      return false;
    }
  };

  const restore = async (id) => {
    const result = await alert("¿Deseas restaurar este usuario?", {
      icon: "info",
      confirmButtonText: "Restaurar",
    });

    if (!result.isConfirmed) return false;

    try {
      await api.put(ENDPOINTS.users.restore(id));
      notify("Usuario restaurado correctamente", "success");
      await list();
      return true;
    } catch (err) {
      notify("Error al restaurar usuario", "error");
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error restaurando user");
      return false;
    }
  };

  const updateAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await api.put(
        ENDPOINTS.profile.updateAvatar,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return res.data;
    } catch (err) {
      console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error subiendo avatar");
      throw err;
    }
  };


  useEffect(() => {
    list();
  }, []);

  return { allData, loading, create, show, update, remove, restore, updateAvatar };
};