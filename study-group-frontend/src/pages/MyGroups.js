import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function MyGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}users/${userId}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch groups');
        return res.json();
      })
      .then(data => setGroups(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId, token]);

  if (!userId || !token) return <p>Please log in to view your groups.</p>;
  if (loading) return <p>Loading your groups...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Groups I'm a Member Of</h2>
      {groups.length === 0 ? (
        <p>You have not joined any groups yet.</p>
      ) : (
        <ul>
          {groups.map(group => (
            <li key={group.id}>{group.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
