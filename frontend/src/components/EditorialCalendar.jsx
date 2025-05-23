import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  Alert,
  Snackbar,
  Paper,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  Event as EventIcon,
} from '@mui/icons-material'

function EditorialCalendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'टेक्नोलॉजी सम्मेलन कवरेज',
      type: 'लेख',
      status: 'निर्धारित',
      author: 'राहुल शर्मा',
      category: 'टेक्नोलॉजी',
      publishDate: '20 मई, 2024',
      deadline: '18 मई, 2024',
      priority: 'उच्च',
      tags: ['सम्मेलन', 'टेक्नोलॉजी', '2024'],
    },
    {
      id: 2,
      title: 'बिजनेस इंटरव्यू',
      type: 'वीडियो',
      status: 'प्रगति पर',
      author: 'प्रिया पटेल',
      category: 'बिजनेस',
      publishDate: '22 मई, 2024',
      deadline: '20 मई, 2024',
      priority: 'मध्यम',
      tags: ['इंटरव्यू', 'बिजनेस', 'पॉडकास्ट'],
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    category: '',
    author: '',
    publishDate: '',
    deadline: '',
    priority: '',
    tags: [],
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = [
    'टेक्नोलॉजी',
    'बिजनेस',
    'राजनीति',
    'खेल',
    'मनोरंजन',
    'स्वास्थ्य',
  ]

  const eventTypes = ['लेख', 'वीडियो', 'ऑडियो', 'इमेज', 'सोशल मीडिया']
  const priorities = ['उच्च', 'मध्यम', 'निम्न']
  const statuses = ['निर्धारित', 'प्रगति पर', 'समीक्षा', 'प्रकाशित', 'रद्द']

  const handleAddEvent = () => {
    const event = {
      id: events.length + 1,
      ...newEvent,
      status: 'निर्धारित',
    }
    setEvents([...events, event])
    setShowAddDialog(false)
    setNewEvent({
      title: '',
      type: '',
      category: '',
      author: '',
      publishDate: '',
      deadline: '',
      priority: '',
      tags: [],
    })
    setShowSuccess(true)
  }

  const handleEditEvent = () => {
    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...newEvent } : event
        )
      )
      setShowEditDialog(false)
      setSelectedEvent(null)
      setShowSuccess(true)
    }
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id))
      setShowDeleteDialog(false)
      setSelectedEvent(null)
      setShowSuccess(true)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          एडिटोरियल कैलेंडर
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddDialog(true)}
        >
          नया कार्यक्रम
        </Button>
      </Box>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setSelectedEvent(event)
                        setNewEvent({
                          title: event.title,
                          type: event.type,
                          category: event.category,
                          author: event.author,
                          publishDate: event.publishDate,
                          deadline: event.deadline,
                          priority: event.priority,
                          tags: event.tags,
                        })
                        setShowEditDialog(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedEvent(event)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.type} • {event.author} • {event.status}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    label={event.category}
                    size="small"
                    color="primary"
                    icon={<EventIcon />}
                  />
                  <Chip
                    label={event.priority}
                    size="small"
                    color={
                      event.priority === 'उच्च'
                        ? 'error'
                        : event.priority === 'मध्यम'
                        ? 'warning'
                        : 'success'
                    }
                  />
                  {event.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    प्रकाशन तिथि: {event.publishDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    अंतिम तिथि: {event.deadline}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Event Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>नया कार्यक्रम जोड़ें</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="शीर्षक"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="प्रकार"
            value={newEvent.type}
            onChange={(e) =>
              setNewEvent({ ...newEvent, type: e.target.value })
            }
            margin="normal"
          >
            {eventTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="श्रेणी"
            value={newEvent.category}
            onChange={(e) =>
              setNewEvent({ ...newEvent, category: e.target.value })
            }
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="लेखक"
            value={newEvent.author}
            onChange={(e) =>
              setNewEvent({ ...newEvent, author: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="प्रकाशन तिथि"
            type="date"
            value={newEvent.publishDate}
            onChange={(e) =>
              setNewEvent({ ...newEvent, publishDate: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="अंतिम तिथि"
            type="date"
            value={newEvent.deadline}
            onChange={(e) =>
              setNewEvent({ ...newEvent, deadline: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            select
            label="प्राथमिकता"
            value={newEvent.priority}
            onChange={(e) =>
              setNewEvent({ ...newEvent, priority: e.target.value })
            }
            margin="normal"
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="टैग (कॉमा से अलग करें)"
            value={newEvent.tags.join(', ')}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleAddEvent}
            variant="contained"
            disabled={!newEvent.title || !newEvent.type}
          >
            जोड़ें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>कार्यक्रम संपादित करें</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="शीर्षक"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="प्रकार"
            value={newEvent.type}
            onChange={(e) =>
              setNewEvent({ ...newEvent, type: e.target.value })
            }
            margin="normal"
          >
            {eventTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="श्रेणी"
            value={newEvent.category}
            onChange={(e) =>
              setNewEvent({ ...newEvent, category: e.target.value })
            }
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="लेखक"
            value={newEvent.author}
            onChange={(e) =>
              setNewEvent({ ...newEvent, author: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="प्रकाशन तिथि"
            type="date"
            value={newEvent.publishDate}
            onChange={(e) =>
              setNewEvent({ ...newEvent, publishDate: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="अंतिम तिथि"
            type="date"
            value={newEvent.deadline}
            onChange={(e) =>
              setNewEvent({ ...newEvent, deadline: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            select
            label="प्राथमिकता"
            value={newEvent.priority}
            onChange={(e) =>
              setNewEvent({ ...newEvent, priority: e.target.value })
            }
            margin="normal"
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="टैग (कॉमा से अलग करें)"
            value={newEvent.tags.join(', ')}
            onChange={(e) =>
              setNewEvent({
                ...newEvent,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleEditEvent}
            variant="contained"
            disabled={!newEvent.title || !newEvent.type}
          >
            अपडेट करें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>कार्यक्रम हटाएं</DialogTitle>
        <DialogContent>
          <Typography>
            क्या आप वाकई इस कार्यक्रम को हटाना चाहते हैं?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>रद्द करें</Button>
          <Button onClick={handleDeleteEvent} color="error">
            हटाएं
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          कार्य सफलतापूर्वक पूरा हुआ!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default EditorialCalendar 