/*
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
*

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import GroupCard from '../../components/groups/GroupCard';

const UserGroupsPage = () => {
  const { token } = useContext(AuthContext);
  console.log("Token:", token);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/my-groups`, {
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

    if (token) fetchUserGroups();
  }, [token]);

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
*/

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserGroupsPage = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/my-groups`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch user groups');
        const data = await response.json();
        setGroups(data);
        console.log("User:", user);
        console.log("Groups:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUserGroups();
  }, [token, user]);

  const handleLeaveGroup = async (membershipId) => {
    if (!window.confirm('Are you sure you want to leave this group?')) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membershipId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to leave group');
      setGroups(prev => prev.filter(g => g.membership_id !== membershipId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm('Are you sure you want to delete this group?')) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete group');
      setGroups(prev => prev.filter(g => g.id !== groupId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Groups</h2>
      <div className="row">
        {groups.length > 0 ? (
          groups.map(group => (
            <div className="col-md-6 col-lg-4 mb-4" key={group.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{group.name}</h5>
                  <p className="card-text">{group.description}</p>
                  <p><strong>Role:</strong> {group.role}</p>
                  <div className="mt-auto d-flex justify-content-between flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/groups/${group.id}`)}
                      className="btn btn-primary btn-sm"
                    >
                      View
                    </button>

                    {group.creator_id === user?.id ? (
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                        {group.membership_id && (
                          <button
                            onClick={() =>
                              navigate(`/groups/${group.id}/members/${group.membership_id}/edit`)
                            }
                            className="btn btn-outline-secondary btn-sm"
                          >
                            Edit Role
                          </button>
                        )}
                      </div>
                    ) : (
                      group.membership_id && (
                        <button
                          onClick={() => handleLeaveGroup(group.membership_id)}
                          className="btn btn-danger btn-sm"
                        >
                          Leave
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
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
