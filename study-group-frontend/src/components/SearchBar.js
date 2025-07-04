// src/components/SearchBar.js
/*
import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search groups..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
    />
  );
}
*/

import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search groups..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
