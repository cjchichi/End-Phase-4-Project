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
