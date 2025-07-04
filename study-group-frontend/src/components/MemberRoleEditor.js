// src/components/MemberRoleEditor.js
/*
import React from 'react';

export default function MemberRoleEditor({ role, onChange }) {
  return (
    <select
      value={role}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="member">Member</option>
      <option value="admin">Admin</option>
    </select>
  );
}
*

import React, { useState } from 'react';

export default function MemberRoleEditor({ member, onRoleUpdate }) {
  const [newRole, setNewRole] = useState(member.role);

  const handleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRole !== member.role) {
      onRoleUpdate(member.id, newRole);
    }
  };

  return (
    <form className="d-flex align-items-center gap-2" onSubmit={handleSubmit}>
      <select
        className="form-select form-select-sm"
        value={newRole}
        onChange={handleChange}
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="btn btn-sm btn-outline-success">
        Update
      </button>
    </form>
  );
}
*/

import React, { useState } from 'react';

export default function MemberRoleEditor({ member, onRoleUpdate }) {
  const [newRole, setNewRole] = useState(member.role);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newRole !== member.role) {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${member.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ role: newRole }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update role');
        }

        const updatedMembership = await response.json();
        onRoleUpdate(updatedMembership); // Call the parent function to update the state
      } catch (err) {
        setError(err.message || 'Failed to update role');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="d-flex align-items-center gap-2" onSubmit={handleSubmit}>
      <select
        className="form-select form-select-sm"
        value={newRole}
        onChange={handleChange}
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="btn btn-sm btn-outline-success" disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </form>
  );
}
