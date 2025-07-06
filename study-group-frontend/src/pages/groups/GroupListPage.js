import React, { useState } from 'react';
import GroupCard from '../../components/groups/GroupCard';
import GroupSearch from '../../components/groups/GroupSearch';
import useGroups from '../../hooks/useGroups';
import { Link } from 'react-router-dom';

const GroupListPage = () => {
  const { groups, loading, error } = useGroups();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  console.log('Groups', groups);
  const groupList = groups.groups || [];
  console.log('Group Names:', groupList.map(group => group.name));
  console.log('Search Term', searchTerm);

  const filteredGroups = Array.isArray(groupList) ? groupList.filter(group => group.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  console.log('Filtered Group', filteredGroups);

  return (
    <div className="container">
      <h2 className="text-center">Groups</h2>
      <GroupSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="row">
        {filteredGroups.map(group => (
          <div className="col-md-4" key={group.id}>
            <GroupCard group={group} />
            <Link to ={`/groups/${group.id}/members`}>{group.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupListPage;
