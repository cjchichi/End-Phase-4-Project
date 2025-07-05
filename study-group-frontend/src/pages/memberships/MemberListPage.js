/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberCard from '../../components/memberships/MemberCard';

const MemberListPage = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${id}/users`);
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
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Group Members</h2>
      <div className="row">
        {members.map(member => (
          <div className="col-md-6 col-lg-4 mb-3" key={member.id}>
            <MemberCard member={member} groupId={id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberListPage;
*/

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemberCard from '../../components/memberships/MemberCard';
import { AuthContext } from '../../context/AuthContext';

const MemberListPage = () => {
  const { id } = useParams();
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
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
        const userMembership = data.find(member => member.user_id === userId);
        setIsMember(!!userMembership);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [id, token, userId]);

  const handleJoin = async () => {
    // Join group logic...
  };

  const handleLeave = async () => {
    // Leave group logic...
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Group Members</h2>
      <div className="row">
        {members.map(member => (
          <div className="col-md-6 col-lg-4 mb-3" key={member.id}>
            <MemberCard member={member} groupId={id} />
          </div>
        ))}
      </div>
      <div className="text-center">
        {isMember ? (
          <button onClick={handleLeave} className="btn btn-danger mt-3">
            Leave Group
          </button>
        ) : (
          <button onClick={handleJoin} className="btn btn-primary mt-3">
            Join Group
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberListPage;

