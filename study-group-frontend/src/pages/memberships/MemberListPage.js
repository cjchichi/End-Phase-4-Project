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
