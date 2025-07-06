import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchProfile();
  }, [user, token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">User Profile</h2>
          <div className="mb-3">
            <strong>Username:</strong> {profile.username}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="mb-3">
            <strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
