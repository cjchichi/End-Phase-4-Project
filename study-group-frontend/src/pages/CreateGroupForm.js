import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function CreateGroupForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { userId, token } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !token) {
      alert('You must be logged in to create a group.');
      return;
    }

    console.log('Creating group with:', { name, description, creator_id: userId });

    fetch(`${process.env.REACT_APP_API_URL}/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MTQzNzAzMiwianRpIjoiNGMzYmNkZWEtYzI4ZC00NjRhLWE3MmYtZDgwNmZkZTRlNzA5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNzUxNDM3MDMyLCJjc3JmIjoiZDhkNGViYjctNjI0ZC00MGMxLWI1ZjEtMzZmNDUzYTViNjk4IiwiZXhwIjoxNzUxNDM3OTMyfQ.NVEfNgWJAZrhcd4v5_1XN08N5g-udOP3oINLl16ChzA",`
      },
      body: JSON.stringify({
        name,
        description,
        creator_id: 1
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create group');
        return res.json();
      })
      .then(() => {
        setName('');
        setDescription('');
        alert('Group created!');
      })
      .catch((err) => {
        console.error('Error creating group:', err);
        alert('Error: could not create group');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create</button>
    </form>
  );
}
