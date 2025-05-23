import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, Link, Divider, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { Google as GoogleIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SocialButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1),
}));

const SignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('reader');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [educationalDetails, setEducationalDetails] = useState('');
  const [certificate, setCertificate] = useState('');
  const { login } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        mobile,
        password,
        userType,
      });
      
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error in registration');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="user-type-label">I want to sign up as a</InputLabel>
                <Select
                  labelId="user-type-label"
                  id="user-type-select"
                  value={userType}
                  label="I want to sign up as a"
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <MenuItem value="reader">Reader</MenuItem>
                  <MenuItem value="journalist">Journalist</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="mobile"
                autoComplete="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>

            {userType === 'journalist' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2 }}>Journalist Details</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="educationalDetails"
                    label="Educational Details"
                    name="educationalDetails"
                    multiline
                    rows={3}
                    value={educationalDetails}
                    onChange={(e) => setEducationalDetails(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="certificate"
                    label="Certificate Details"
                    name="certificate"
                    helperText="Please provide details or a link to your certificate"
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3, width: '100%' }}>OR</Divider>

        <SocialButton variant="outlined" startIcon={<GoogleIcon />}>
          Sign Up with Google
        </SocialButton>
        <SocialButton variant="outlined" startIcon={<TwitterIcon />}>
          Sign Up with Twitter
        </SocialButton>
        <SocialButton variant="outlined" startIcon={<InstagramIcon />}>
          Sign Up with Instagram
        </SocialButton>

      </Paper>
    </Container>
  );
};

export default SignUp; 