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
