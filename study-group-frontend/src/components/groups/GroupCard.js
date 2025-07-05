/*
import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{group.name}</h5>
        <p className="card-text">{group.description}</p>
        <Link to={`/groups/${group.id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default GroupCard;
*/

import React from 'react';
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{group.name}</h5>
        <p className="card-text">{group.description}</p>
        <Link to={`/groups/${group.id}`} className="btn btn-primary">View Details</Link>
        <Link to={`/groups/${group.id}/members`} className="btn btn-info ms-2">View Members</Link>
        <Link to={`/groups/${group.id}/join`} className="btn btn-success ms-2">Join Group</Link>
        <Link to={`/groups/${group.id}/leave`} className="btn btn-danger ms-2">Leave Group</Link>
      </div>
    </div>
  );
};

export default GroupCard;
