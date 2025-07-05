import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GroupDetailPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`);
        if (!response.ok) throw new Error('Failed to fetch group details');
        const data = await response.json();
        setGroup(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default GroupDetailPage;
