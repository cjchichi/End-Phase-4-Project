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
  const { token, userId } = useContext(AuthContext); // Assuming userId is available in AuthContext
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
        // Check if the current user is a member
        const userMembership = data.find(member => member.user_id === userId);
        setIsMember(!!userMembership);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [id, token, userId]); // Added userId to the dependency array

  const handleJoin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          study_group_id: id,
          role: 'member'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to join group');
      }

      // Optionally, you can refetch members or update the state
      setIsMember(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLeave = async () => {
    try {
      const membershipsRes = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me/memberships`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!membershipsRes.ok) throw new Error('Failed to fetch memberships');
      
      const memberships = await membershipsRes.json();
      const membership = memberships.find(m => m.study_group_id == id);
      
      if (!membership) throw new Error('Not a member of this group');

      const deleteRes = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membership.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!deleteRes.ok) throw new Error('Failed to leave group');

      // Optionally, you can refetch members or update the state
      setIsMember(false);
    } catch (err) {
      setError(err.message);
    }
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
