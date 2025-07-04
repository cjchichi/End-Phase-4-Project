/*
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [joined, setJoined] = useState(false);
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`)
      .then(res => res.json())
      .then(data => setGroup(data));

    if (userId && token) {
      fetch(`${process.env.REACT_APP_API_URL}/api${userId}groups`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          const alreadyJoined = data.some(group => group.id === parseInt(id));
          setJoined(alreadyJoined);
        });
    }
  }, [id, userId, token]);

  const handleJoin = () => {
    if (!userId || !token) {
    alert("You must be logged in to join");
    return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        study_group_id: id,
        role: 'member'
      })
    })
      .then(res => res.json())
      .then(() => setJoined(true));
  };

  const handleLeave = () => {
    if (!userId || !token) {
    alert("You must be logged in to join");
    return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/memberships`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(memberships => {
        const membership = memberships.find(m => m.study_group_id === parseInt(id));
        if (membership) {
          fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membership.id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          }).then(() => setJoined(false));
        }
      });
  };

  if (!group) return <div>Loading...</div>;

  return (
    <div>
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      {!joined ? (
        <button onClick={handleJoin}>Join Group</button>
      ) : (
        <button onClick={handleLeave}>Leave Group</button>
      )}
    </div>
  );
}
*

// src/pages/GroupList.js
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 6;

  const { token } = useContext(AuthContext);
/*
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setGroups(data);
        setFilteredGroups(data);
      });
  }, [token]);
*

useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setGroups(data);
    })
    .catch(err => {
      console.error('Fetch error:', err);
    });
}, [token]);

  // Search + Filter + Sort
  useEffect(() => {
    let result = groups;

    if (searchTerm) {
      result = result.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(group => group.category === category);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'members') return (b.members?.length || 0) - (a.members?.length || 0);
      return 0;
    });

    setFilteredGroups(result);
    setCurrentPage(1); // reset to first page on filter change
  }, [searchTerm, category, sortBy, groups]);

  // Pagination
  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);
  const indexOfLast = currentPage * groupsPerPage;
  const indexOfFirst = indexOfLast - groupsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Study Groups</h2>

      {/* Filters *}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">All Categories</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border px-2 py-1 rounded">
          <option value="name">Sort by Name</option>
          <option value="members">Sort by Members</option>
        </select>
      </div>

      {/* Group Cards *}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentGroups.map(group => (
          <div key={group.id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <p className="text-sm text-gray-600">{group.description}</p>
            <Link to={`/groups/${group.id}`} className="text-green-700 font-medium mt-2 inline-block">View Details</Link>
          </div>
        ))}
      </div>

      {/* Pagination *}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
*

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupDetailPage() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setGroup(data));
  }, [id, token]);

  if (!group) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-3">{group.name}</h2>
      <p className="mb-2 text-gray-700">{group.description}</p>
      <p className="text-gray-600 text-sm">Location: {group.location}</p>
      <p className="text-gray-600 text-sm">Meeting Time: {group.meeting_time}</p>
      <p className="text-gray-600 text-sm">Max Members: {group.max_members}</p>
    </div>
  );
}
*
//bootstrap
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupDetailPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setGroup(data));
  }, [id, token]);

  if (!group) return <div className="text-center my-5">Loading group...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h2 className="card-title text-primary">{group.name}</h2>
          <p className="card-text text-muted">{group.description}</p>

          <ul className="list-group list-group-flush my-3">
            <li className="list-group-item">📍 Location: {group.location}</li>
            <li className="list-group-item">🕒 Meeting Time: {group.meeting_time}</li>
            <li className="list-group-item">👥 Max Members: {group.max_members}</li>
            <li className="list-group-item">🧑 Creator ID: {group.creator_id}</li>
          </ul>

          <button className="btn btn-outline-primary me-2">Join Group</button>
          <button className="btn btn-outline-secondary">Edit Group</button>
        </div>
      </div>
    </div>
  );
}
*/

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupListPage() {
  const { token } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/study_groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch groups');

      const data = await res.json();
      setGroups(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">All Study Groups</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {groups.length === 0 ? (
          <p className="text-center">No groups found.</p>
        ) : (
          groups.map((group) => (
            <div className="col-md-4 mb-4" key={group.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{group.name}</h5>
                  <p className="card-text"><strong>Subject:</strong> {group.subject}</p>
                  <p className="card-text">{group.description}</p>
                  <Link to={`/groups/${group.id}`} className="btn btn-outline-primary mt-auto">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

