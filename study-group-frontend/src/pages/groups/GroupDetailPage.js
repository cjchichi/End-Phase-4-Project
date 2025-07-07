import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const GroupDetailPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext); 
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
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
  }, [id, token]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!group) return <div>No group found.</div>; 
  return (
    <div className="container">
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      {/* Add more details as needed */}

      {/* Navigation Links */}
      <div className="mt-3">
        <Link to={`/groups/${id}/members`} className="btn btn-info">View Members</Link>
        <Link to={`/groups/${id}/join`} className="btn btn-primary">Join Group</Link>
        <Link to={`/groups/${id}/leave`} className="btn btn-danger">Leave Group</Link>
      </div>
    </div>
  );
};

export default GroupDetailPage;
