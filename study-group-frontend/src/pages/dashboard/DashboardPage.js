import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Welcome to Study Groups</h1>
        <p className="lead text-muted">
          Connect, collaborate, and grow with fellow learners.
        </p>
        <h2 className="text-center">Dashboard</h2>
        <p>Welcome to your dashboard! Here you can manage your groups and memberships.</p>
      </div>

      <div className="row g-4">
        {/* View Groups */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Explore Groups</h5>
              <p className="card-text">Browse study groups based on topics and locations.</p>
              <Link to="/groups" className="btn btn-primary mt-auto">View Groups</Link>
            </div>
          </div>
        </div>

        {/* Create Group */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Create a Group</h5>
              <p className="card-text">Start your own group and invite others to join.</p>
              <Link to="/groups/new" className="btn btn-success mt-auto">Create Group</Link>
            </div>
          </div>
        </div>

        {/* My Groups */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">My Groups</h5>
              <p className="card-text">See groups you've created or joined.</p>
              <Link to="/my-groups" className="btn btn-secondary mt-auto">My Groups</Link>
            </div>
          </div>
        </div>

        {/* Membership Management */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Membership Management</h5>
              <p className="card-text">Manage your group memberships and roles.</p>
              <Link to="/my-groups" className="btn btn-info mt-auto">Manage Memberships</Link>

            </div>
          </div>
        </div>
      
       {/* Manage My Groups */}
      <div className="col-md-4">
        <div className="card shadow border-0 h-100">
        <div className="card-body d-flex flex-column">
        <h5 className="card-title">Manage My Groups</h5>
        <p className="card-text">Leave or delete groups you've joined or created.</p>
        <Link to="/my-groups" className="btn btn-warning mt-auto">Manage Groups</Link>
        </div>
        </div>  
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
