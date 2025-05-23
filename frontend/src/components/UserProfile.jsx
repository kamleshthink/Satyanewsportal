import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material'

function UserProfile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'News enthusiast and tech writer',
    avatar: '/static/images/avatar/2.jpg',
    role: 'Author',
    joinDate: 'January 2024',
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'English',
    twoFactorAuth: false,
  })

  const [openDialog, setOpenDialog] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleEditToggle = () => {
    if (editMode) {
      setUser(editedUser)
    }
    setEditMode(!editMode)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSettingChange = (setting) => (event) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: event.target.checked,
    }))
  }

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic
    console.log('Deleting account...')
    handleCloseDialog()
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
            {editMode ? (
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
            )}
            <Typography color="text.secondary" gutterBottom>
              {user.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {user.joinDate}
            </Typography>
            <Button
              variant="outlined"
              startIcon={editMode ? <SaveIcon /> : <EditIcon />}
              onClick={handleEditToggle}
              sx={{ mt: 2 }}
            >
              {editMode ? 'Save Profile' : 'Edit Profile'}
            </Button>
          </Paper>
        </Grid>

        {/* Settings Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive email updates about your account"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleSettingChange('emailNotifications')}
                    />
                  }
                  label=""
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Push Notifications"
                  secondary="Receive push notifications on your device"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={handleSettingChange('pushNotifications')}
                    />
                  }
                  label=""
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Switch between light and dark theme"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.darkMode}
                      onChange={handleSettingChange('darkMode')}
                    />
                  }
                  label=""
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Language"
                  secondary="Change your preferred language"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.language === 'Hindi'}
                      onChange={() =>
                        setSettings((prev) => ({
                          ...prev,
                          language: prev.language === 'English' ? 'Hindi' : 'English',
                        }))
                      }
                    />
                  }
                  label=""
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security to your account"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={handleSettingChange('twoFactorAuth')}
                    />
                  }
                  label=""
                />
              </ListItem>
            </List>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleOpenDialog}
              >
                Delete Account
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Delete Account Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default UserProfile 