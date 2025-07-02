import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [joined, setJoined] = useState(false);
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}groups/${id}`)
      .then(res => res.json())
      .then(data => setGroup(data));

    if (userId && token) {
      fetch(`${process.env.REACT_APP_API_URL}/${userId}groups`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          const alreadyJoined = data.some(group => group.id === parseInt(id));
          setJoined(alreadyJoined);
        });
    }
  }, [id, userId, token]);

  const handleJoin = () => {
    if (!userId || !token) {
    alert("You must be logged in to join");
    return;
    }
    fetch(`${process.env.REACT_APP_API_URL}memberships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        study_group_id: id,
        role: 'member'
      })
    })
      .then(res => res.json())
      .then(() => setJoined(true));
  };

  const handleLeave = () => {
    if (!userId || !token) {
    alert("You must be logged in to join");
    return;
    }
    fetch(`${process.env.REACT_APP_API_URL}users/${userId}/memberships`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(memberships => {
        const membership = memberships.find(m => m.study_group_id === parseInt(id));
        if (membership) {
          fetch(`${process.env.REACT_APP_API_URL}memberships/${membership.id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          }).then(() => setJoined(false));
        }
      });
  };

  if (!group) return <div>Loading...</div>;

  return (
    <div>
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      {!joined ? (
        <button onClick={handleJoin}>Join Group</button>
      ) : (
        <button onClick={handleLeave}>Leave Group</button>
      )}
    </div>
  );
}
