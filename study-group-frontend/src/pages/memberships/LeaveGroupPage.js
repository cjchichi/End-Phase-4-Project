/*
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LeaveGroupPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLeave = async () => {
    try {
      // First get the membership ID for this user-group relationship
      const membershipsRes = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me/memberships`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!membershipsRes.ok) throw new Error('Failed to fetch memberships');
      
      const memberships = await membershipsRes.json();
      const membership = memberships.find(m => m.study_group_id == id);
      
      if (!membership) throw new Error('Not a member of this group');

      // Then delete the membership
      const deleteRes = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membership.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!deleteRes.ok) throw new Error('Failed to leave group');

      navigate('/my-groups');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container text-center py-5">
      <h2>Leave Group</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4 mx-auto" style={{maxWidth: '500px'}}>
        <p className="mb-4">Are you sure you want to leave this group?</p>
        <button 
          onClick={handleLeave}
          className="btn btn-danger"
        >
          Confirm Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveGroupPage;
*/

import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LeaveGroupPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLeave = async () => {
    try {
      const membershipsRes = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me/memberships`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!membershipsRes.ok) throw new Error('Failed to fetch memberships');
      
      const memberships = await membershipsRes.json();
      const membership = memberships.find(m => m.study_group_id == id);
      
      if (!membership) throw new Error('Not a member of this group');

      const deleteRes = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membership.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!deleteRes.ok) throw new Error('Failed to leave group');

      navigate('/my-groups');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container text-center py-5">
      <h2>Leave Group</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4 mx-auto" style={{maxWidth: '500px'}}>
        <p className="mb-4">Are you sure you want to leave this group?</p>
        <button 
          onClick={handleLeave}
          className="btn btn-danger"
        >
          Confirm Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveGroupPage;

/*
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LeaveGroupPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLeave = async () => {
    console.log(`Leaving group ID: ${id}`);
    try {
      const membershipsRes = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me/memberships`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!membershipsRes.ok) throw new Error('Failed to fetch memberships');
      
      const memberships = await membershipsRes.json();
      const membership = memberships.find(m => m.study_group_id == id);
      
      if (!membership) throw new Error('Not a member of this group');

      const deleteRes = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membership.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!deleteRes.ok) throw new Error('Failed to leave group');

      navigate('/my-groups');
    } catch (err) {
      console.error('Error leaving group:', err);
    }
  };

  return (
    <div>
      <h2>Leave Group</h2>
      <button onClick={handleLeave}>Confirm Leave</button>
    </div>
  );
};

export default LeaveGroupPage;
*/