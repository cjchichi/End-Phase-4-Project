/*
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setGroups(data));
  }, [token]);

  return (
    <div>
      <h2>All Study Groups</h2>
      <ul>
        {groups.map(group => (
          <li key={group.id}>
            <Link to={`/groups/${group.id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
*

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [sortOption, setSortOption] = useState('az');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const GROUPS_PER_PAGE = 6;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${groups.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch groups');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setGroups(data);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Unable to load groups. Please try again later.');
      });
  }, [token]);

  const sortedGroups = [...groups].sort((a, b) => {
    if (sortOption === 'az') return a.name.localeCompare(b.name);
    if (sortOption === 'za') return b.name.localeCompare(a.name);
    if (sortOption === 'members')
      return (b.memberships?.length || 0) - (a.memberships?.length || 0);
    return 0;
  });

  const indexOfLast = currentPage * GROUPS_PER_PAGE;
  const indexOfFirst = indexOfLast - GROUPS_PER_PAGE;
  const paginatedGroups = sortedGroups.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedGroups.length / GROUPS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Study Groups</h2>

      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <>
          {/* Sorting *}
          <div className="flex justify-end mb-6">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="az">Sort A–Z</option>
              <option value="za">Sort Z–A</option>
              <option value="members">Most Members</option>
            </select>
          </div>

          {/* Group Cards *}
          {paginatedGroups.length === 0 ? (
            <p className="text-gray-600 text-center">No groups found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedGroups.map(group => (
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

          {/* Pagination Controls *}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-100'
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
*

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupListPage() {
  const { token } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Study Groups</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-2">{group.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{group.description}</p>
            <Link to={`/groups/${group.id}`} className="text-green-600 mt-3 block hover:underline">View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
  *

// GroupListPage.js (Bootstrap Styled)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function GroupListPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups`)
      .then(res => res.json())
      .then(setGroups)
      .catch(err => console.error('Error loading groups:', err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Study Groups</h2>
      <div className="row g-4">
        {groups.map(group => (
          <div className="col-md-6 col-lg-4" key={group.id}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{group.name}</h5>
                <p className="card-text">{group.description}</p>
                <p className="text-muted small">Location: {group.location}</p>
                <Link to={`/groups/${group.id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/study_groups`, {
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
*


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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MTYzMjc3MSwianRpIjoiNzZjZDcxOTItYjNkYy00Njc2LTgzZGMtMGU0YzczNmU0YWFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NiwibmJmIjoxNzUxNjMyNzcxLCJjc3JmIjoiZDFhOGQ2ZGMtZjkzYy00Nzk1LWEyMWEtOGIxMjgwZmU0ZjYwIiwiZXhwIjoxNzUxNjMzNjcxfQ.GASRoUVZL0Mu0MYGjVbG6qujzrmdCHD0zS6Mv2yUdz0`,
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
*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GroupListPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups?page=${currentPage}&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch groups');
        const data = await response.json();
        setGroups(data.groups);
        setTotalPages(data.pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Study Groups</h2>
      <Link to="/create-group" className="btn btn-primary mb-3">+ Create Group</Link>
      <div className="list-group">
        {groups.map(group => (
          <Link key={group.id} to={`/groups/${group.id}`} className="list-group-item list-group-item-action">
            <h5 className="mb-1">{group.name}</h5>
            <p className="mb-1">{group.description}</p>
            <small>Created by User ID: {group.creator_id}</small>
          </Link>
        ))}
      </div>
      <nav aria-label="Page navigation">
        <ul className="pagination mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GroupListPage;

