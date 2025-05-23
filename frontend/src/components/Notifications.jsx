import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Button,
} from '@mui/material'
import {
  Notifications as NotificationsIcon,
  Comment as CommentIcon,
  ThumbUp as ThumbUpIcon,
  Bookmark as BookmarkIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material'

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'comment',
      message: 'John Doe commented on your article',
      time: '5 minutes ago',
      read: false,
      link: '/article/1',
    },
    {
      id: 2,
      type: 'like',
      message: 'Sarah Smith liked your article',
      time: '1 hour ago',
      read: false,
      link: '/article/2',
    },
    {
      id: 3,
      type: 'bookmark',
      message: 'Your article was bookmarked by 5 users',
      time: '2 hours ago',
      read: true,
      link: '/article/3',
    },
    {
      id: 4,
      type: 'system',
      message: 'Your article has been published',
      time: '1 day ago',
      read: true,
      link: '/article/4',
    },
  ])

  const [anchorEl, setAnchorEl] = useState(null)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    )
    handleClose()
  }

  const handleDelete = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    )
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'comment':
        return <CommentIcon color="primary" />
      case 'like':
        return <ThumbUpIcon color="secondary" />
      case 'bookmark':
        return <BookmarkIcon color="success" />
      case 'system':
        return <InfoIcon color="info" />
      default:
        return <NotificationsIcon />
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Notifications
        </Typography>
        <Box>
          <Badge badgeContent={unreadCount} color="error">
            <IconButton onClick={handleClick}>
              <NotificationsIcon />
            </IconButton>
          </Badge>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleMarkAllAsRead}>
              Mark all as read
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Paper>
        <List>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  bgcolor: notification.read ? 'inherit' : 'action.hover',
                }}
              >
                <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                />
                <ListItemSecondaryAction>
                  {!notification.read && (
                    <IconButton
                      edge="end"
                      onClick={() => handleMarkAsRead(notification.id)}
                      sx={{ mr: 1 }}
                    >
                      <CheckCircleIcon color="success" />
                    </IconButton>
                  )}
                  <IconButton
                    edge="end"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < notifications.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Container>
  )
}

export default Notifications 