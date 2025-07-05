/*
import React from 'react';

const DashboardPage = () => {
  return (
    <div className="container">
      <h2 className="text-center">Dashboard</h2>
      <p>Welcome to your dashboard! Here you can manage your groups and memberships.</p>
    </div>
  );
};

export default DashboardPage;
*

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

            <div className="col-md-4">
              <div className="card shadow border-0 h-100">
              <div className="card-body d-flex flex-column">
              <h5 className="card-title">Membership Management</h5>
              <p className="card-text">Manage your group memberships and roles.</p>
              <Link to="/members" className="btn btn-info mt-auto">Member List</Link>
              <Link to="/join-group" className="btn btn-warning mt-auto">Join Group</Link>
              <Link to="/leave-group" className="btn btn-danger mt-auto">Leave Group</Link>
              <Link to="/edit-member-role" className="btn btn-light mt-auto">Edit Member Role</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
*/

        /* New Membership Section *}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Membership Management</h5>
              <p className="card-text">Manage your group memberships and roles.</p>
              <Link to="/members" className="btn btn-info mt-auto">Member List</Link>
              <Link to="/join-group" className="btn btn-warning mt-auto">Join Group</Link>
              <Link to="/leave-group" className="btn btn-danger mt-auto">Leave Group</Link>
              <Link to="/edit-member-role" className="btn btn-light mt-auto">Edit Member Role</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
*


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

        {/* New Membership Section *}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Membership Management</h5>
              <p className="card-text">Manage your group memberships and roles.</p>
              <Link to="/members" className="btn btn-info mt-auto">Member List</Link>
              <Link to="/join-group" className="btn btn-warning mt-auto">Join Group</Link>
              <Link to="/leave-group" className="btn btn-danger mt-auto">Leave Group</Link>
              <Link to="/edit-member-role" className="btn btn-light mt-auto">Edit Member Role</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
*/


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

        {/* New Membership Section */}
        <div className="col-md-4">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Membership Management</h5>
              <p className="card-text">Manage your group memberships and roles.</p>
              <Link to="/members" className="btn btn-info mt-auto">Member List</Link>
              <Link to="/join-group" className="btn btn-warning mt-auto">Join Group</Link>
              <Link to="/leave-group" className="btn btn-danger mt-auto">Leave Group</Link>
              <Link to="/edit-member-role" className="btn btn-light mt-auto">Edit Member Role</Link>
              <Link to="/groups/:id/edit" className="btn btn-secondary mt-auto">Edit Group</Link> {/* Add this line */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
