import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const RoleEditor = ({ member, onUpdate }) => {
  const [role, setRole] = useState(member.role);
  const { token } = useContext(AuthContext);

  const handleRoleChange = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) throw new Error('Failed to update role');

      const updated = await response.json();
      onUpdate(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        onBlur={handleRoleChange}
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleEditor;
