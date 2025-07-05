import React from 'react';
import MemberCard from './MemberCard';

const MemberList = ({ members }) => {
  return (
    <div>
      {members.map(member => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default MemberList;
