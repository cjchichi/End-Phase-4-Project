/*
import React from 'react';

export default function Dashboard() {
  return (
    <div className = "dashboard">
      <h1>Welcome to the Study Group App</h1>
      <p>Discover, join, and create study groups tailored to your interests.
Collaborate with like-minded learners, stay organized, and take your academic journey to the next level — all in one elegant space.</p>
    </div>
  );
}
*

import React from 'react';

export default function Dashboard() {
  return (
    <div className="dashboard px-6 py-10 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6 text-primary">Welcome to StudyHub</h1>
      <p className="text-lg mb-4">
        Join a vibrant learning community where collaboration drives success.
      </p>
      <p className="text-md text-gray-700 mb-4">
        Whether you're preparing for exams, mastering new skills, or simply exploring ideas — StudyHub connects you
        with people who share your academic goals. Create study groups, organize sessions, assign roles, and grow together.
      </p>
      <p className="text-md text-gray-700">
        Find your group. Share knowledge. Stay motivated. Make studying social.
      </p>
    </div>
  );
}
*

import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="bg-white rounded-2xl shadow p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Welcome to Your Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link to="/groups" className="block p-4 bg-green-100 hover:bg-green-200 rounded-xl text-green-900 font-semibold shadow">
            Browse Study Groups
          </Link>
          <Link to="/groups/create" className="block p-4 bg-green-100 hover:bg-green-200 rounded-xl text-green-900 font-semibold shadow">
            Create a Study Group
          </Link>
        </div>
      </div>
    </div>
  );
  */
//bootstrap
import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Welcome to Study Groups</h1>
        <p className="lead text-muted">
          Connect, collaborate, and grow with fellow learners.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Explore Groups</h5>
              <p className="card-text">Browse study groups based on topics and locations.</p>
              <Link to="/groups" className="btn btn-primary mt-auto">View Groups</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Create a Group</h5>
              <p className="card-text">Start your own group and invite others to join.</p>
              <Link to="/groups/new" className="btn btn-success mt-auto">Create Group</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">My Groups</h5>
              <p className="card-text">See groups you've created or joined.</p>
              <Link to="/my-groups" className="btn btn-secondary mt-auto">My Groups</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
