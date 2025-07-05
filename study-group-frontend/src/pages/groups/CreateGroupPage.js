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
