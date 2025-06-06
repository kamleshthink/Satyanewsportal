import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Divider,
} from '@mui/material'
import axios from 'axios'
import { useGoogleAuth } from '../hooks/useGoogleAuth'

function SignIn() {
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()
  const { signInWithGoogle, error: googleError } = useGoogleAuth()

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://satyanewsportal-backend.onrender.com/api/auth/login', {
        email: emailOrPhone,
        password,
      })
      
      login(response.data.token, response.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error in login')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      console.log('Starting Google Sign In...');
      const user = await signInWithGoogle();
      console.log('Google Sign In successful:', user);
      
      console.log('Sending data to backend...');
      const response = await axios.post('https://satyanewsportal-backend.onrender.com/api/auth/google-login', {
        email: user.email,
        name: user.displayName,
        googleId: user.uid,
        profilePicture: user.photoURL
      });
      console.log('Backend response:', response.data);
      
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Google Sign In failed:', error);
      setError(error.response?.data?.message || 'Google Sign In failed');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Mobile Number"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }}>OR</Divider>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 1 }}
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </Button>
          {googleError && <Typography color="error" sx={{ mt: 1 }}>{googleError}</Typography>}
          <Button
            fullWidth
            variant="outlined"
            sx={{ mb: 1 }}
            onClick={() => {/* Handle Twitter Sign In */}}
          >
            Sign In with Twitter
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {/* Handle Instagram Sign In */}}
          >
            Sign In with Instagram
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default SignIn 