import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to sign in page
    navigate('/signin');
  };

  return (
    <Button 
      variant="outlined" 
      color="error" 
      onClick={handleLogout}
      sx={{ ml: 2 }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton; 