/*
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

    fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/groups`, {
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
*

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MyGroupsPage() {
  const { token, userId } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error('Error fetching user groups:', err));
  }, [userId, token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Study Groups</h2>

      {groups.length === 0 ? (
        <p className="text-center text-gray-600">You haven't joined or created any groups yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {groups.map(group => (
            <div key={group.id} className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">{group.description}</p>
              <Link
                to={`/groups/${group.id}`}
                className="inline-block mt-2 text-green-700 hover:text-green-900 font-medium"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
*
//bootsrap
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MyGroups() {
  const { token, userId } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/my-groups`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch(() => alert('Failed to fetch your groups'));
  }, [token]);

  if (!groups.length) {
    return <div className="container mt-5 text-center"><h5>You haven’t joined or created any groups yet.</h5></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">My Study Groups</h2>
      <div className="row">
        {groups.map((group) => (
          <div className="col-md-4 mb-4" key={group.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text">{group.description}</p>
                <p><strong>Location:</strong> {group.location}</p>
                <p><strong>Meeting Time:</strong> {group.meeting_time}</p>
                <p><strong>Members:</strong> {group.members?.length || 0} / {group.max_members}</p>
                <Link to={`/groups/${group.id}`} className="btn btn-outline-primary w-100 mt-2">View Group</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MyGroups() {
  const { token, userId } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/users/${userId}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load groups');
        return res.json();
      })
      .then(setGroups)
      .catch((err) => setError(err.message));
  }, [token]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Study Groups</h2>
        <Link to="/create-group" className="btn btn-primary">+ Create Group</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {groups.length === 0 ? (
        <div className="text-center text-muted">You haven't joined or created any groups yet.</div>
      ) : (
        <div className="row">
          {groups.map((group) => (
            <div key={group.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{group.name}</h5>
                  <p className="card-text mb-1"><strong>Subject:</strong> {group.subject}</p>
                  <p className="card-text text-truncate">{group.description}</p>
                  <Link to={`/groups/${group.id}`} className="mt-auto btn btn-outline-primary btn-sm">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
