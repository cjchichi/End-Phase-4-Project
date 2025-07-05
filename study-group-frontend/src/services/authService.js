export const login = async (email, password) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json();
};

export const register = async (username, email, password) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return await response.json();
};

export const logout = () => {
  // Clear client-side authentication
  localStorage.removeItem('token');
};
