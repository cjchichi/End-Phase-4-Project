/*
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  console.log("User:", user);
  console.log("Token:", token);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok){
          throw new Error('Failed to fetch profile');
        }

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
*/

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Unable to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

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
