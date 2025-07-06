// pages/groups/EditGroupPage.js
/*
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import GroupForm from '../../components/groups/GroupForm';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const EditGroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);  // Get token from context
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await fetchGroupDetails(id, token);  // Pass token here
        setGroup(groupData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id, token]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    
    try {
      await updateGroup(id, formData, token);  // Pass token here
      navigate(`/groups/${id}`, { state: { success: 'Group updated successfully!' } });
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p>Loading group details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Edit Group</h1>
      <GroupForm 
        initialData={group} 
        onSubmit={handleSubmit}
        isSubmitting={submitting}
      />
    </Container>
  );
};

export default EditGroupPage;

*

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const EditGroupPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [group, setGroup] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch group details');
        const data = await response.json();
        setGroup(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup((prevGroup) => ({ ...prevGroup, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(group)
      });

      if (!response.ok) throw new Error('Failed to update group');
      navigate(`/groups/${id}/members`); // Redirect to the members page after editing
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2>Edit Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={group.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={group.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Group</button>
      </form>
    </div>
  );
};

export default EditGroupPage;
*/

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const EditGroupPage = () => {
  const { id } = useParams(); // Get the actual group ID from the URL
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [group, setGroup] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, { // Use the actual ID here
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch group details');
        const data = await response.json();
        setGroup(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup((prevGroup) => ({ ...prevGroup, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(group)
      });

      if (!response.ok) throw new Error('Failed to update group');
      navigate(`/groups/${id}/members`); // Redirect to the members page after editing
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2>Edit Group</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={group.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={group.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Group</button>
      </form>
    </div>
  );
};

export default EditGroupPage;

