/*
import React, { useState } from 'react';

const RoleEditor = ({ member, onUpdate }) => {
  const [role, setRole] = useState(member.role);

  const handleRoleChange = async () => {
    // Call API to update role
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${member.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (response.ok) {
      onUpdate({ ...member, role });
    }
  };

  return (
    <div>
      <select value={role} onChange={(e) => setRole(e.target.value)} onBlur={handleRoleChange}>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleEditor;
*/

// src/components/RoleEditor.js
import React from 'react';

const RoleEditor = ({ memberId, currentRole, onUpdate }) => {
    const handleRoleChange = (newRole) => {
        onUpdate(memberId, newRole);
    };

    return (
        <div>
            <select value={currentRole} onChange={(e) => handleRoleChange(e.target.value)}>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                {/* Add more roles as needed */}
            </select>
        </div>
    );
};

export default RoleEditor;
