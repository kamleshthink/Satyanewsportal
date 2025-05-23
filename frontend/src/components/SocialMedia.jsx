import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const SocialMedia = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6">Follow Us</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton color="primary" aria-label="Facebook">
          <Facebook />
        </IconButton>
        <IconButton color="primary" aria-label="Twitter">
          <Twitter />
        </IconButton>
        <IconButton color="primary" aria-label="Instagram">
          <Instagram />
        </IconButton>
        <IconButton color="primary" aria-label="LinkedIn">
          <LinkedIn />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SocialMedia; 