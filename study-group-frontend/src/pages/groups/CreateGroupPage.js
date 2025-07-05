/*
import React from 'react';
import GroupForm from '../../components/groups/GroupForm';

const CreateGroupPage = () => {
  const handleSubmit = async (groupData) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });

    if (response.ok) {
      // Handle successful group creation
    }
  };

  return (
    <div className="container">
      <h2>Create Group</h2>
      <GroupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateGroupPage;
*

import React from 'react';
import GroupForm from '../../components/groups/GroupForm';
import { useNavigate } from 'react-router-dom';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (groupData) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage or wherever you store it
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Group created:', data);
        navigate('/groups');
        // Handle successful group creation (e.g., redirect or update state)
      } else {
        const errorData = await response.json();
        console.error('Error creating group:', errorData);
        // Handle error response
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="container">
      <h2>Create Group</h2>
      <GroupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateGroupPage;
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../../components/groups/GroupForm';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (groupData) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Group created:', data);
        navigate('/groups'); // Redirect to the groups page
      } else {
        const errorData = await response.json();
        console.error('Error creating group:', errorData);
        setError(errorData.message || 'Failed to create group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      setError('An error occurred while creating the group.');
    }
  };

  return (
    <div className="container">
      <h2>Create Group</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <GroupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateGroupPage;
