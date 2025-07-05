import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import GroupCard from '../../components/groups/GroupCard';

const UserGroupsPage = () => {
  const { token, user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${user.id}/groups`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch user groups');
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchUserGroups();
  }, [token, user]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Groups</h2>
      <div className="row">
        {groups.length > 0 ? (
          groups.map(group => (
            <div className="col-md-6 col-lg-4 mb-3" key={group.id}>
              <GroupCard group={group} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">You haven't joined any groups yet.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGroupsPage;
