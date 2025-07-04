// src/components/GroupCard.js
/*
import React from 'react';
import { Link } from 'react-router-dom';

export default function GroupCard({ group }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-green-700 mb-2">{group.name}</h3>
      <p className="text-gray-600 mb-2">{group.description}</p>
      <p className="text-sm text-gray-500 mb-1"><strong>Location:</strong> {group.location}</p>
      <p className="text-sm text-gray-500 mb-1"><strong>Meeting Time:</strong> {group.meeting_time}</p>
      <p className="text-sm text-gray-500 mb-4"><strong>Members:</strong> {group.members?.length || 0}/{group.max_members}</p>
      
      <div className="flex justify-end">
        <Link
          to={`/groups/${group.id}`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
}
*/

import React from 'react';
import { Link } from 'react-router-dom';

export default function GroupCard({ group }) {
  return (
    <div className="card shadow mb-4 h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-primary">{group.name}</h5>
          <p className="card-text mb-1"><strong>Subject:</strong> {group.subject}</p>
          <p className="card-text mb-1"><strong>Meeting Time:</strong> {group.meeting_time}</p>
          <p className="card-text text-muted">{group.description}</p>
        </div>
        <div className="text-end mt-3">
          <Link to={`/groups/${group.id}`} className="btn btn-outline-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
