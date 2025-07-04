/*
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function EditGroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, userId } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/groups/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.creator_id !== userId) {
          setError('You are not authorized to edit this group.');
        } else {
          setGroup(data);
        }
        setLoading(false);
      })
      .catch(() => setError('Failed to fetch group info.'));
  }, [id, token, userId]);

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/api/groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(group),
    })
      .then((res) => {
        if (res.ok) navigate(`/groups/${id}`);
        else throw new Error('Update failed');
      })
      .catch(() => alert('Error updating group'));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Group</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          value={group.name}
          onChange={handleChange}
          placeholder="Group Name"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          name="description"
          value={group.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          name="location"
          value={group.location || ''}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          name="meeting_time"
          value={group.meeting_time || ''}
          onChange={handleChange}
          placeholder="Meeting Time"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="number"
          name="max_members"
          value={group.max_members || ''}
          onChange={handleChange}
          placeholder="Max Members"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
*

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
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setGroup(data);
        if (data.creator_id !== userId) {
          setError('You are not authorized to edit this group.');
        }
      });
  }, [id, token, userId]);

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(group),
    })
      .then(res => res.json())
      .then(() => navigate(`/groups/${id}`))
      .catch(() => alert('Error updating group'));
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!group) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Group Name</label>
        <input name="name" className="form-control" value={group.name} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea name="description" className="form-control" value={group.description} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>
        <input name="location" className="form-control" value={group.location} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Meeting Time</label>
        <input name="meeting_time" className="form-control" value={group.meeting_time} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Max Members</label>
        <input name="max_members" type="number" className="form-control" value={group.max_members || ''} onChange={handleChange} />
      </div>

      <button type="submit" className="btn btn-primary w-100">Update Group</button>
    </form>
  );
}
*/

import React, { useState, useEffect } from 'react';

export default function EditGroupForm({ group, token, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    meeting_time: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || '',
        subject: group.subject || '',
        description: group.description || '',
        meeting_time: group.meeting_time || '',
      });
    }
  }, [group]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${group.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to update group.');
      }

      const updated = await res.json();
      onUpdate(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card shadow p-4">
      <h3 className="text-center mb-4">Edit Group</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-success w-100">Save Changes</button>
      </form>
    </div>
  );
}
