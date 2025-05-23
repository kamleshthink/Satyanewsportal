import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Publish as PublishIcon,
  Unpublished as UnpublishedIcon,
  Category as CategoryIcon,
  Tag as TagIcon,
} from '@mui/icons-material'

function ContentManagement() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'भारत में आर्टिफिशियल इंटेलिजेंस का विकास',
      content: 'भारत में AI और मशीन लर्निंग के क्षेत्र में नवीनतम प्रगति...',
      category: 'टेक्नोलॉजी',
      tags: ['AI', 'मशीन लर्निंग', 'टेक्नोलॉजी'],
      status: 'प्रकाशित',
      author: 'राहुल शर्मा',
      date: '17 मई, 2024',
    },
    {
      id: 2,
      title: 'भारतीय अर्थव्यवस्था में नए रुझान',
      content: 'वर्तमान आर्थिक परिदृश्य और भविष्य की संभावनाएं...',
      category: 'अर्थव्यवस्था',
      tags: ['अर्थव्यवस्था', 'वित्त', 'व्यापार'],
      status: 'मसौदा',
      author: 'प्रिया पटेल',
      date: '16 मई, 2024',
    },
  ])

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const categories = [
    'टेक्नोलॉजी',
    'अर्थव्यवस्था',
    'राजनीति',
    'खेल',
    'मनोरंजन',
    'स्वास्थ्य',
  ]

  const handleAddArticle = () => {
    const article = {
      id: articles.length + 1,
      ...newArticle,
      status: 'मसौदा',
      author: 'वर्तमान उपयोगकर्ता',
      date: new Date().toLocaleDateString('hi-IN'),
    }
    setArticles([...articles, article])
    setShowAddDialog(false)
    setNewArticle({ title: '', content: '', category: '', tags: [] })
    setShowSuccess(true)
  }

  const handleEditArticle = () => {
    if (selectedArticle) {
      setArticles(
        articles.map((article) =>
          article.id === selectedArticle.id
            ? { ...article, ...newArticle }
            : article
        )
      )
      setShowEditDialog(false)
      setSelectedArticle(null)
      setShowSuccess(true)
    }
  }

  const handleDeleteArticle = () => {
    if (selectedArticle) {
      setArticles(articles.filter((article) => article.id !== selectedArticle.id))
      setShowDeleteDialog(false)
      setSelectedArticle(null)
      setShowSuccess(true)
    }
  }

  const handlePublishToggle = (article) => {
    setArticles(
      articles.map((a) =>
        a.id === article.id
          ? {
              ...a,
              status: a.status === 'प्रकाशित' ? 'मसौदा' : 'प्रकाशित',
            }
          : a
      )
    )
    setShowSuccess(true)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          कंटेंट प्रबंधन
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowAddDialog(true)}
        >
          नया लेख
        </Button>
      </Box>

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} key={article.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" gutterBottom>
                    {article.title}
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={() => {
                        setSelectedArticle(article)
                        setNewArticle({
                          title: article.title,
                          content: article.content,
                          category: article.category,
                          tags: article.tags,
                        })
                        setShowEditDialog(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedArticle(article)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handlePublishToggle(article)}>
                      {article.status === 'प्रकाशित' ? (
                        <UnpublishedIcon />
                      ) : (
                        <PublishIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {article.content}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    icon={<CategoryIcon />}
                    label={article.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  {article.tags.map((tag) => (
                    <Chip
                      key={tag}
                      icon={<TagIcon />}
                      label={tag}
                      size="small"
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {article.author} • {article.date} • {article.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Article Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>नया लेख जोड़ें</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="शीर्षक"
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="सामग्री"
            value={newArticle.content}
            onChange={(e) =>
              setNewArticle({ ...newArticle, content: e.target.value })
            }
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            select
            label="श्रेणी"
            value={newArticle.category}
            onChange={(e) =>
              setNewArticle({ ...newArticle, category: e.target.value })
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
            value={newArticle.tags.join(', ')}
            onChange={(e) =>
              setNewArticle({
                ...newArticle,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleAddArticle}
            variant="contained"
            disabled={!newArticle.title || !newArticle.content}
          >
            जोड़ें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)}>
        <DialogTitle>लेख संपादित करें</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="शीर्षक"
            value={newArticle.title}
            onChange={(e) =>
              setNewArticle({ ...newArticle, title: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="सामग्री"
            value={newArticle.content}
            onChange={(e) =>
              setNewArticle({ ...newArticle, content: e.target.value })
            }
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            select
            label="श्रेणी"
            value={newArticle.category}
            onChange={(e) =>
              setNewArticle({ ...newArticle, category: e.target.value })
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
            value={newArticle.tags.join(', ')}
            onChange={(e) =>
              setNewArticle({
                ...newArticle,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleEditArticle}
            variant="contained"
            disabled={!newArticle.title || !newArticle.content}
          >
            अपडेट करें
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>लेख हटाएं</DialogTitle>
        <DialogContent>
          <Typography>
            क्या आप वाकई इस लेख को हटाना चाहते हैं?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>रद्द करें</Button>
          <Button onClick={handleDeleteArticle} color="error">
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

export default ContentManagement 