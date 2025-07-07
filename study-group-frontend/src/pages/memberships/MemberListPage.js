import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const MemberListPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(`Fetching members for group ID: ${id}`);
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch members');
        const data = await response.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [id, token]);

  console.log('Members:', members);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
    <h2 className="mb-4">Group Members</h2>
    {error && <div className="alert alert-danger">{error}</div>}
    {members.length > 0 ? (
      <div className="row">
        {members.map((member) => (
          <div key={member.id} className="col-md-4 mb-3">
            <div className="card p-3">
              <h5>{member.username}</h5>
              <p>{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No members found</p>
    )}
  </div>
);
}

export default MemberListPage;


