/*
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
*/

// src/components/MemberCard.js
import React from 'react';

const MemberCard = ({ member }) => {
    return (
        <div>
            <h3>{member.name}</h3>
            <p>Role: {member.role}</p>
            {/* Add buttons for editing role or leaving group */}
        </div>
    );
};

export default MemberCard;
