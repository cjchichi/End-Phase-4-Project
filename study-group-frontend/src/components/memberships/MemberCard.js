import React from 'react';

const MemberCard = ({ member }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{member.username}</h5>
        <p className="card-text">Role: {member.role}</p>
      </div>
    </div>
  );
};

export default MemberCard;
