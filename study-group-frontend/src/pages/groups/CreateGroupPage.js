import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../../components/groups/GroupForm';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (groupData) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Group created:', data);
        navigate('/groups'); 
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
