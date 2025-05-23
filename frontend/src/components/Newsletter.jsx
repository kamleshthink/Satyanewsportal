import React from 'react'
import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material'
import {
  Send as SendIcon,
  Email as EmailIcon,
  Category as CategoryIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [frequency, setFrequency] = useState('daily')
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = [
    { id: 'tech', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'politics', name: 'Politics' },
    { id: 'sports', name: 'Sports' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
  ]

  const frequencies = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
  ]

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add newsletter subscription logic here
    console.log('Newsletter subscription:', {
      email,
      categories: selectedCategories,
      frequency,
    })
    setShowSuccess(true)
    setEmail('')
    setSelectedCategories([])
    setFrequency('daily')
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Newsletter Subscription
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
        Get the latest updates on your favorite topics
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Subscription Form
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />

                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                  Select Topics
                </Typography>
                <FormGroup>
                  <Grid container spacing={1}>
                    {categories.map((category) => (
                      <Grid item xs={6} key={category.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => handleCategoryToggle(category.id)}
                            />
                          }
                          label={category.name}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>

                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                  Update Frequency
                </Typography>
                <FormGroup>
                  {frequencies.map((freq) => (
                    <FormControlLabel
                      key={freq.id}
                      control={
                        <Checkbox
                          checked={frequency === freq.id}
                          onChange={() => setFrequency(freq.id)}
                        />
                      }
                      label={freq.name}
                    />
                  ))}
                </FormGroup>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                  startIcon={<SendIcon />}
                  disabled={!email || selectedCategories.length === 0}
                >
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Newsletter Benefits
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CategoryIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Topic-Specific Updates"
                    secondary="Get the latest information on your favorite topics"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <ScheduleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Regular Updates"
                    secondary="Daily, weekly, or monthly updates based on your preference"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Delivery"
                    secondary="Receive the latest news directly in your inbox"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Subscription successful!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Newsletter 