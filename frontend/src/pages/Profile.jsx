import { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Button,
  Grid,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
} from '@mui/material'
import {
  Edit,
  Bookmark,
  History,
  Settings,
  Notifications,
} from '@mui/icons-material'

function Profile() {
  const [tabValue, setTabValue] = useState(0)

  // Mock user data
  const user = {
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    avatar: 'https://picsum.photos/200',
    bio: 'News Journalist and Writer',
    savedArticles: [
      {
        id: 1,
        title: 'New Technological Revolution in India',
        date: 'May 17, 2024',
      },
      {
        id: 2,
        title: 'Startup Ecosystem Development',
        date: 'May 16, 2024',
      },
    ],
    readingHistory: [
      {
        id: 1,
        title: 'Digital India Success',
        date: 'May 15, 2024',
      },
      {
        id: 2,
        title: 'New Technological Revolution in India',
        date: 'May 14, 2024',
      },
    ],
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {user.bio}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {user.email}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              sx={{ mb: 2 }}
            >
              Edit Profile
            </Button>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Bookmark />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Saved Articles" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <History />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Reading History" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Settings />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Notifications />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Notifications" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ mb: 3 }}
            >
              <Tab label="Saved Articles" />
              <Tab label="Reading History" />
            </Tabs>

            {tabValue === 0 && (
              <List>
                {user.savedArticles.map((article) => (
                  <ListItem
                    key={article.id}
                    secondaryAction={
                      <IconButton edge="end">
                        <Bookmark />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={article.title}
                      secondary={article.date}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {tabValue === 1 && (
              <List>
                {user.readingHistory.map((article) => (
                  <ListItem key={article.id}>
                    <ListItemText
                      primary={article.title}
                      secondary={article.date}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile 