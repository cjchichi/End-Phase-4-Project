import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const JoinGroupPage = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  console.log("Token:", token);
  const navigate = useNavigate();

  const handleJoin = async () => {
    console.log(`Joining group ID: ${id}`);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ study_group_id: id, user_id:user?.id, role: 'member' })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to join group');
      }

      navigate(`/groups/${id}/members`);
    } catch (err) {
      console.error('Error joining group:', err);
    }
  };

  return (
    <div>
      <h2>Join Group</h2>
      <button onClick={handleJoin}>Confirm Join</button>
    </div>
  );
};

export default JoinGroupPage;

