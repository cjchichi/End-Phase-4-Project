export const fetchGroups = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`);
  if (!response.ok) throw new Error('Failed to fetch groups');
  return await response.json();
};

export const createGroup = async (groupData, token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(groupData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create group');
  }

  return await response.json();
};

export const updateGroup = async (groupId, groupData, token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${groupId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(groupData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update group');
  }

  return await response.json();
};

export const deleteGroup = async (groupId, token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/groups/${groupId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete group');
  }
};
