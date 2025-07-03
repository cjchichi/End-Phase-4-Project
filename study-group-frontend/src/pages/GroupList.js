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
*/

// src/pages/GroupList.js
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [sortOption, setSortOption] = useState('az');
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useContext(AuthContext);

  const GROUPS_PER_PAGE = 6;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setGroups(data));
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

      {/* Sorting */}
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

      {/* Group Cards */}
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

      {/* Pagination Controls */}
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
    </div>
  );
}
