/*
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

    fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
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
}*

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function CreateGroupForm() {
  const { userId, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    meeting_time: '',
    max_members: '',
    role: 'member',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId || !token) {
      alert('You must be logged in to create a group.');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        creator_id: userId
      })
    })
      .then(res => res.json())
      .then(group => {
        // Auto-join after creation
        fetch(`${process.env.REACT_APP_API_URL}/api/memberships`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            user_id: userId,
            study_group_id: group.id,
            role: formData.role
          })
        });

        alert('Group created and joined!');
        setFormData({
          name: '',
          description: '',
          location: '',
          meeting_time: '',
          max_members: '',
          role: 'member',
        });
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Could not create group');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Create Study Group</h2>

      <input
        type="text"
        name="name"
        placeholder="Group Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="meeting_time"
        placeholder="Meeting Time (e.g. Sat 3PM)"
        value={formData.meeting_time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        name="max_members"
        placeholder="Max Members"
        value={formData.max_members}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Create & Join Group
      </button>
    </form>
  );
}
*/

// src/pages/EditGroupForm.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function EditGroupForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, userId } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`)
      .then(res => res.json())
      .then(data => {
        setGroup(data);
        if (data.creator_id !== userId) {
          setError('You are not authorized to edit this group.');
        }
      });
  }, [id, userId]);

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(group)
    })
      .then(res => res.json())
      .then(() => navigate(`/groups/${id}`))
      .catch(() => alert('Error updating group'));
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!group) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={group.name} onChange={handleChange} placeholder="Group Name" className="input" required />
        <textarea name="description" value={group.description} onChange={handleChange} placeholder="Description" className="input" required />
        <input name="location" value={group.location} onChange={handleChange} placeholder="Location" className="input" />
        <input name="meeting_time" value={group.meeting_time} onChange={handleChange} placeholder="Meeting Time" className="input" />
        <input name="max_members" type="number" value={group.max_members || ''} onChange={handleChange} placeholder="Max Members" className="input" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update Group</button>
      </form>
    </div>
  );
}

