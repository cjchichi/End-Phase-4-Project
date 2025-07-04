/*
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreateGroupPage() {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    meeting_time: '',
    max_members: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...formData, creator_id: userId }),
    });

    if (res.ok) {
      const newGroup = await res.json();
      navigate(`/groups/${newGroup.id}`);
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Group</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Group Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            name="location"
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            name="meeting_time"
            type="text"
            placeholder="Meeting Time"
            value={formData.meeting_time}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            name="max_members"
            type="number"
            placeholder="Max Members"
            value={formData.max_members}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}
*

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreateGroupPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    meeting_time: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/study_groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create group.');
      }

      const data = await res.json();
      navigate(`/groups/${data.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Create Study Group</h2>

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

              <button type="submit" className="btn btn-primary w-100">Create Group</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreateGroupPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    meeting_time: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.REACT_APP_API_URL}/api/study_groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create group.');
      }

      const data = await res.json();
      navigate(`/groups/${data.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Create Study Group</h2>

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

          <button type="submit" className="btn btn-primary w-100">Create Group</button>
        </form>
      </div>
    </div>
  );
}
