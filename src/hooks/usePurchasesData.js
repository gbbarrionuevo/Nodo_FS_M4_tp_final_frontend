import { useState, useEffect } from 'react';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';

export const usePurchasesData = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        const res = await api.get(ENDPOINTS.purchases.list);

        setAllData(res.data || []);
      } catch (err) {
        console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error cargando purchases");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { allData, loading };
};