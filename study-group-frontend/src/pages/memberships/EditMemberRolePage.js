import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const EditMemberRolePage = () => {
  const { id, memberId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberRole = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${memberId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch member role');
        const data = await response.json();
        setRole(data.role);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberRole();
  }, [memberId, id, token]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (!response.ok) throw new Error('Failed to update role');

      navigate('/my-groups');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Member Role</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-select"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleUpdate}>Update Role</button>
    </div>
  );
};

export default EditMemberRolePage;


