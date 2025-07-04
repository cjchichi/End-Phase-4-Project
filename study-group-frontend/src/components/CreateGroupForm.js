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
*

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreateGroupForm() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', description: '', location: '', meeting_time: '', max_members: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => navigate(`/groups/${data.id}`));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Group Name" className="input" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input" required />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="input" />
        <input name="meeting_time" value={formData.meeting_time} onChange={handleChange} placeholder="Meeting Time" className="input" />
        <input name="max_members" type="number" value={formData.max_members} onChange={handleChange} placeholder="Max Members" className="input" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create Group</button>
      </form>
    </div>
  );
}
*/

// src/components/CreateGroupForm.js
import React from 'react';


export default function CreateGroupForm({ formData, handleChange, handleSubmit, error }) {
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Group Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Subject</label>
        <input
          type="text"
          name="subject"
          className="form-control"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Meeting Time</label>
        <input
          type="text"
          name="meeting_time"
          className="form-control"
          value={formData.meeting_time}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          rows="3"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100">Create Group</button>
    </form>
  );
}
