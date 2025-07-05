import React from 'react';

const GroupSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a group..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default GroupSearch;
