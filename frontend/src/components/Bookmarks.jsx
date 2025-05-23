import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Label as LabelIcon,
} from '@mui/icons-material'

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'भारत में आर्टिफिशियल इंटेलिजेंस का विकास',
      description: 'भारत में AI और मशीन लर्निंग के क्षेत्र में नवीनतम प्रगति',
      image: 'https://picsum.photos/400/200?random=1',
      category: 'टेक्नोलॉजी',
      date: '17 मई, 2024',
      tags: ['AI', 'मशीन लर्निंग', 'टेक्नोलॉजी'],
    },
    {
      id: 2,
      title: 'भारतीय अर्थव्यवस्था में नए रुझान',
      description: 'वर्तमान आर्थिक परिदृश्य और भविष्य की संभावनाएं',
      image: 'https://picsum.photos/400/200?random=2',
      category: 'अर्थव्यवस्था',
      date: '16 मई, 2024',
      tags: ['अर्थव्यवस्था', 'वित्त', 'व्यापार'],
    },
  ])

  const [selectedBookmark, setSelectedBookmark] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showTagDialog, setShowTagDialog] = useState(false)
  const [newTag, setNewTag] = useState('')

  const handleMenuOpen = (event, bookmark) => {
    setAnchorEl(event.currentTarget)
    setSelectedBookmark(bookmark)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedBookmark(null)
  }

  const handleDelete = () => {
    if (selectedBookmark) {
      setBookmarks((prev) =>
        prev.filter((bookmark) => bookmark.id !== selectedBookmark.id)
      )
      setShowDeleteDialog(false)
      handleMenuClose()
    }
  }

  const handleShare = () => {
    setShowShareDialog(true)
    handleMenuClose()
  }

  const handleAddTag = () => {
    if (selectedBookmark && newTag.trim()) {
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === selectedBookmark.id
            ? {
                ...bookmark,
                tags: [...bookmark.tags, newTag.trim()],
              }
            : bookmark
        )
      )
      setNewTag('')
      setShowTagDialog(false)
      handleMenuClose()
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        बुकमार्क्स
      </Typography>

      <Grid container spacing={3}>
        {bookmarks.map((bookmark) => (
          <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={bookmark.image}
                  alt={bookmark.title}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="h6" component="div" gutterBottom>
                      {bookmark.title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, bookmark)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {bookmark.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={bookmark.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    {bookmark.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        icon={<LabelIcon />}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 1 }}
                  >
                    {bookmark.date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bookmark Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => setShowDeleteDialog(true)}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          हटाएं
        </MenuItem>
        <MenuItem onClick={handleShare}>
          <ShareIcon fontSize="small" sx={{ mr: 1 }} />
          शेयर करें
        </MenuItem>
        <MenuItem onClick={() => setShowTagDialog(true)}>
          <LabelIcon fontSize="small" sx={{ mr: 1 }} />
          टैग जोड़ें
        </MenuItem>
      </Menu>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>बुकमार्क हटाएं</DialogTitle>
        <DialogContent>
          <Typography>
            क्या आप वाकई इस बुकमार्क को हटाना चाहते हैं?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>रद्द करें</Button>
          <Button onClick={handleDelete} color="error">
            हटाएं
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onClose={() => setShowShareDialog(false)}>
        <DialogTitle>बुकमार्क शेयर करें</DialogTitle>
        <DialogContent>
          <Typography>
            इस बुकमार्क को शेयर करने के लिए नीचे दिए गए लिंक का उपयोग करें:
          </Typography>
          <TextField
            fullWidth
            value={`https://example.com/article/${selectedBookmark?.id}`}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowShareDialog(false)}>बंद करें</Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://example.com/article/${selectedBookmark?.id}`
              )
              setShowShareDialog(false)
            }}
            variant="contained"
          >
            कॉपी करें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Tag Dialog */}
      <Dialog open={showTagDialog} onClose={() => setShowTagDialog(false)}>
        <DialogTitle>टैग जोड़ें</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="नया टैग"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTagDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleAddTag}
            variant="contained"
            disabled={!newTag.trim()}
          >
            जोड़ें
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Bookmarks 