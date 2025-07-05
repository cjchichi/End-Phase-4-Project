export const joinGroup = async (groupId, token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      study_group_id: groupId,
      role: 'member'
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to join group');
  }

  return await response.json();
};

export const leaveGroup = async (membershipId, token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membershipId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to leave group');
  }
};

export const updateMemberRole = async (membershipId, role, token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/memberships/${membershipId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ role })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update role');
  }

  return await response.json();
};

export const fetchGroupMembers = async (groupId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${groupId}/users`);
  if (!response.ok) throw new Error('Failed to fetch group members');
  return await response.json();
};

export const fetchUserMemberships = async (userId, token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/memberships`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch user memberships');
  return await response.json();
};
