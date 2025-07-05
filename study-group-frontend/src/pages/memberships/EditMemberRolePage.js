/*
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const EditMemberRolePage = () => {
  const { id, memberId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberRole = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${memberId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch member role');
        const data = await response.json();
        setRole(data.role);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMemberRole();
  }, [memberId, token]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (!response.ok) throw new Error('Failed to update role');
      
      navigate(`/groups/${id}/members`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <h2>Edit Member Role</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4" style={{maxWidth: '500px'}}>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select 
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button 
          onClick={handleUpdate}
          className="btn btn-primary"
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default EditMemberRolePage;
*/

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const EditMemberRolePage = () => {
  const { id, memberId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberRole = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${memberId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch member role');
        const data = await response.json();
        setRole(data.role);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMemberRole();
  }, [memberId, token]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (!response.ok) throw new Error('Failed to update role');
      
      navigate(`/groups/${id}/members`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <h2>Edit Member Role</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4" style={{maxWidth: '500px'}}>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select 
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button 
          onClick={handleUpdate}
          className="btn btn-primary"
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default EditMemberRolePage;
