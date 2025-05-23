import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  Divider,
} from '@mui/material'
import {
  Save as SaveIcon,
  Publish as PublishIcon,
  Schedule as ScheduleIcon,
  History as HistoryIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  Mic as AudioIcon,
  Tag as TagIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
} from '@mui/icons-material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function EditorialDashboard() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState([])
  const [author, setAuthor] = useState('')
  const [publishDate, setPublishDate] = useState(null)
  const [status, setStatus] = useState('draft')
  const [editorMode, setEditorMode] = useState('rich') // rich or markdown
  const [showPreview, setShowPreview] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [readabilityScore, setReadabilityScore] = useState(0)
  const [plagiarismScore, setPlagiarismScore] = useState(0)
  const [selectedTab, setSelectedTab] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      const draft = {
        title,
        content,
        description,
        slug,
        category,
        tags,
        author,
        status,
        lastSaved: new Date().toISOString(),
      }
      localStorage.setItem('articleDraft', JSON.stringify(draft))
      setSnackbar({
        open: true,
        message: 'Draft auto-saved',
        severity: 'info',
      })
    }

    const timer = setTimeout(autoSave, 30000) // Auto-save every 30 seconds
    return () => clearTimeout(timer)
  }, [title, content, description, slug, category, tags, author, status])

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('articleDraft')
    if (savedDraft) {
      const draft = JSON.parse(savedDraft)
      setTitle(draft.title)
      setContent(draft.content)
      setDescription(draft.description)
      setSlug(draft.slug)
      setCategory(draft.category)
      setTags(draft.tags)
      setAuthor(draft.author)
      setStatus(draft.status)
    }
  }, [])

  // Calculate word count and readability score
  useEffect(() => {
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean)
    setWordCount(words.length)
    // TODO: Implement actual readability score calculation
    setReadabilityScore(75)
  }, [content])

  const handleSave = () => {
    // TODO: Implement save functionality
    setSnackbar({
      open: true,
      message: 'Article saved successfully',
      severity: 'success',
    })
  }

  const handlePublish = () => {
    // TODO: Implement publish functionality
    setSnackbar({
      open: true,
      message: 'Article published successfully',
      severity: 'success',
    })
  }

  const handleSchedule = () => {
    // TODO: Implement schedule functionality
    setSnackbar({
      open: true,
      message: 'Article scheduled successfully',
      severity: 'success',
    })
  }

  const handleTagAdd = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete))
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Write" />
            <Tab label="Preview" />
            <Tab label="SEO" />
            <Tab label="Media" />
            <Tab label="Settings" />
          </Tabs>
        </Box>

        {selectedTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="URL Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant={editorMode === 'rich' ? 'contained' : 'outlined'}
                  onClick={() => setEditorMode('rich')}
                  sx={{ mr: 1 }}
                >
                  Rich Text
                </Button>
                <Button
                  variant={editorMode === 'markdown' ? 'contained' : 'outlined'}
                  onClick={() => setEditorMode('markdown')}
                >
                  Markdown
                </Button>
              </Box>
              <ReactQuill
                value={content}
                onChange={setContent}
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="technology">Technology</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="entertainment">Entertainment</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Tags"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleTagAdd(e.target.value)
                    e.target.value = ''
                  }
                }}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Author</InputLabel>
                <Select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  label="Author"
                >
                  <MenuItem value="john-doe">John Doe</MenuItem>
                  <MenuItem value="jane-smith">Jane Smith</MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Schedule Publish"
                  value={publishDate}
                  onChange={setPublishDate}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth sx={{ mb: 2 }} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save Draft
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ScheduleIcon />}
                  onClick={handleSchedule}
                  disabled={!publishDate}
                >
                  Schedule
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PublishIcon />}
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Box>
        )}

        {selectedTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                SEO Preview
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                <Typography variant="h5" color="primary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`https://yourwebsite.com/${slug}`}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Content Analysis
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{wordCount}</Typography>
                    <Typography variant="body2">Words</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{readabilityScore}%</Typography>
                    <Typography variant="body2">Readability</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{plagiarismScore}%</Typography>
                    <Typography variant="body2">Originality</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}

        {selectedTab === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Media Library
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<ImageIcon />}
                  component="label"
                >
                  Upload Image
                  <input type="file" hidden accept="image/*" />
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<VideoIcon />}
                  component="label"
                >
                  Upload Video
                  <input type="file" hidden accept="video/*" />
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AudioIcon />}
                  component="label"
                >
                  Upload Audio
                  <input type="file" hidden accept="audio/*" />
                </Button>
              </Box>
              {/* TODO: Add media grid/list view */}
            </Grid>
          </Grid>
        )}

        {selectedTab === 4 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Article Settings
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="review">Under Review</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value="en"
                  label="Language"
                  startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="hi">Hindi</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Access Level</InputLabel>
                <Select
                  value="public"
                  label="Access Level"
                  startAdornment={<SecurityIcon sx={{ mr: 1 }} />}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="subscribers">Subscribers Only</MenuItem>
                  <MenuItem value="premium">Premium Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default EditorialDashboard 