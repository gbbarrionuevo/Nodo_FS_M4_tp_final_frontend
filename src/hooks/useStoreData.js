import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';
import { ENDPOINTS } from '../api/endpoints.js';

export const useStoreData = () => {
  const { token } = useAuth(); 

  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      try {
        const res = await api.get(ENDPOINTS.store.list);
        
        setAllData(res.data || []);
      } catch (err) {
        console.error(err.response?.data?.errors?.[0]?.message || err.response?.data?.error || "Error cargando store");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  const totalPages = Math.ceil(allData.length / limit);

  const currentPageData = allData.slice(
    (page - 1) * limit,
    page * limit
  );

  return { allData, currentPageData, loading, page, setPage, totalPages };
};