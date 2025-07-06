
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


/*
// src/services/membershipService.js
const API_URL = process.env.REACT_APP_API_URL; // Ensure this is set in your .env file

export const createMembership = async (membershipData) => {
    const response = await fetch(`${API_URL}/api/memberships`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(membershipData),
    });
    if (!response.ok) {
        throw new Error('Failed to create membership');
    }
    return await response.json();
};

export const leaveGroup = async (membershipId) => {
    const response = await fetch(`${API_URL}/api/groups/${membershipId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to leave group');
    }
    return await response.json();
};

export const updateMembership = async (membershipId, role) => {
    const response = await fetch(`${API_URL}/api/memberships/${membershipId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
    });
    if (!response.ok) {
        throw new Error('Failed to update membership');
    }
    return await response.json();
};

// Add the getMembers function
export const getMembers = async (groupId) => {
    const response = await fetch(`${API_URL}/api/groups/${groupId}/users`, {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch members');
    }
    return await response.json();
};
*/