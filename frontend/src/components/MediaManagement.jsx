import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
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
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'

function MediaManagement() {
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      title: 'टेक्नोलॉजी सम्मेलन 2024',
      type: 'वीडियो',
      url: 'https://example.com/video1.mp4',
      thumbnail: 'https://picsum.photos/400/225',
      size: '256MB',
      duration: '15:30',
      category: 'टेक्नोलॉजी',
      tags: ['सम्मेलन', 'टेक्नोलॉजी', '2024'],
      uploadDate: '17 मई, 2024',
    },
    {
      id: 2,
      title: 'बिजनेस इंटरव्यू',
      type: 'ऑडियो',
      url: 'https://example.com/audio1.mp3',
      thumbnail: 'https://picsum.photos/400/225',
      size: '45MB',
      duration: '30:15',
      category: 'बिजनेस',
      tags: ['इंटरव्यू', 'बिजनेस', 'पॉडकास्ट'],
      uploadDate: '16 मई, 2024',
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [newMedia, setNewMedia] = useState({
    title: '',
    type: '',
    category: '',
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

  const mediaTypes = ['वीडियो', 'ऑडियो', 'इमेज']

  const handleAddMedia = () => {
    const media = {
      id: mediaFiles.length + 1,
      ...newMedia,
      url: 'https://example.com/media' + (mediaFiles.length + 1),
      thumbnail: 'https://picsum.photos/400/225',
      size: '0MB',
      duration: '00:00',
      uploadDate: new Date().toLocaleDateString('hi-IN'),
    }
    setMediaFiles([...mediaFiles, media])
    setShowAddDialog(false)
    setNewMedia({ title: '', type: '', category: '', tags: [] })
    setShowSuccess(true)
  }

  const handleEditMedia = () => {
    if (selectedMedia) {
      setMediaFiles(
        mediaFiles.map((media) =>
          media.id === selectedMedia.id ? { ...media, ...newMedia } : media
        )
      )
      setShowEditDialog(false)
      setSelectedMedia(null)
      setShowSuccess(true)
    }
  }

  const handleDeleteMedia = () => {
    if (selectedMedia) {
      setMediaFiles(mediaFiles.filter((media) => media.id !== selectedMedia.id))
      setShowDeleteDialog(false)
      setSelectedMedia(null)
      setShowSuccess(true)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          मीडिया प्रबंधन
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddDialog(true)}
        >
          नया मीडिया
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mediaFiles.map((media) => (
          <Grid item xs={12} md={6} key={media.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={media.thumbnail}
                alt={media.title}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" gutterBottom>
                    {media.title}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setSelectedMedia(media)
                        setNewMedia({
                          title: media.title,
                          type: media.type,
                          category: media.category,
                          tags: media.tags,
                        })
                        setShowEditDialog(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedMedia(media)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {media.type} • {media.size} • {media.duration}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip label={media.category} size="small" color="primary" />
                  {media.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  अपलोड: {media.uploadDate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Media Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>नया मीडिया जोड़ें</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="शीर्षक"
            value={newMedia.title}
            onChange={(e) =>
              setNewMedia({ ...newMedia, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="प्रकार"
            value={newMedia.type}
            onChange={(e) =>
              setNewMedia({ ...newMedia, type: e.target.value })
            }
            margin="normal"
          >
            {mediaTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="श्रेणी"
            value={newMedia.category}
            onChange={(e) =>
              setNewMedia({ ...newMedia, category: e.target.value })
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
            label="टैग (कॉमा से अलग करें)"
            value={newMedia.tags.join(', ')}
            onChange={(e) =>
              setNewMedia({
                ...newMedia,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleAddMedia}
            variant="contained"
            disabled={!newMedia.title || !newMedia.type}
          >
            जोड़ें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Media Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>मीडिया संपादित करें</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="शीर्षक"
            value={newMedia.title}
            onChange={(e) =>
              setNewMedia({ ...newMedia, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="प्रकार"
            value={newMedia.type}
            onChange={(e) =>
              setNewMedia({ ...newMedia, type: e.target.value })
            }
            margin="normal"
          >
            {mediaTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            select
            label="श्रेणी"
            value={newMedia.category}
            onChange={(e) =>
              setNewMedia({ ...newMedia, category: e.target.value })
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
            label="टैग (कॉमा से अलग करें)"
            value={newMedia.tags.join(', ')}
            onChange={(e) =>
              setNewMedia({
                ...newMedia,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleEditMedia}
            variant="contained"
            disabled={!newMedia.title || !newMedia.type}
          >
            अपडेट करें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>मीडिया हटाएं</DialogTitle>
        <DialogContent>
          <Typography>
            क्या आप वाकई इस मीडिया को हटाना चाहते हैं?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>रद्द करें</Button>
          <Button onClick={handleDeleteMedia} color="error">
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

export default MediaManagement 