// src/components/SortDropdown.js
/*
import React from 'react';

export default function SortDropdown({ sortOption, onChange }) {
  return (
    <select
      value={sortOption}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
    >
      <option value="name">Sort by Name</option>
      <option value="location">Sort by Location</option>
      <option value="members">Sort by Members</option>
    </select>
  );
}
*/

import React from 'react';

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="mb-3">
      <select
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="subject">Subject</option>
        <option value="created_at">Date Created</option>
      </select>
    </div>
  );
}

