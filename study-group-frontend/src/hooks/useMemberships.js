import { useState, useEffect } from 'react';

const useMemberships = (userId) => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/memberships`);
        if (!response.ok) throw new Error('Failed to fetch memberships');
        const data = await response.json();
        setMemberships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, [userId]);

  return { memberships, loading, error };
};

export default useMemberships;
