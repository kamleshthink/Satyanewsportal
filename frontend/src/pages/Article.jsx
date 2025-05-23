import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
  IconButton,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
} from '@mui/material'
import {
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  Comment as CommentIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material'
import Comments from '../components/Comments'

function Article() {
  const { id } = useParams()
  const [readingProgress, setReadingProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)

  // Mock article data
  const article = {
    id: id,
    title: 'New Technological Revolution in India',
    content: `India's progress in Artificial Intelligence and Machine Learning has amazed the world. 
    Indian startups and tech companies are now making their mark globally.
    
    Government policies and young talents have contributed significantly to this development. India has now 
    become a key player in the field of AI and ML.`,
    author: 'Rahul Sharma',
    date: 'May 17, 2024',
    category: 'Technology',
    image: 'https://picsum.photos/800/400',
    likes: 245,
    comments: [
      {
        id: 1,
        user: 'Amit Kumar',
        text: 'Great information. Thanks!',
        date: 'May 17, 2024',
      },
      {
        id: 2,
        user: 'Priya Singh',
        text: 'I want to work in this field too.',
        date: 'May 17, 2024',
      },
    ],
  }

  // Mock related articles
  const relatedArticles = [
    {
      id: 2,
      title: 'Startup Ecosystem Development',
      category: 'Business',
      image: 'https://picsum.photos/400/300',
      date: 'May 16, 2024',
    },
    {
      id: 3,
      title: 'Digital India Success',
      category: 'Technology',
      image: 'https://picsum.photos/400/301',
      date: 'May 15, 2024',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing article:', article)
  }

  const handleComment = (e) => {
    e.preventDefault()
    // Implement comment functionality
    console.log('Adding comment:', comment)
    setComment('')
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Reading Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={readingProgress}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      />

      {/* Article Header */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {article.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ width: 40, height: 40, mr: 2 }}
            alt={article.author}
            src={`https://i.pravatar.cc/150?u=${article.author}`}
          />
          <Box>
            <Typography variant="subtitle1">{article.author}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                {article.date}
              </Typography>
              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption" color="text.secondary">
                {article.category}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Chip
          label={article.category}
          color="primary"
          size="small"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={handleBookmark}>
            {isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton onClick={handleLike}>
            {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
          </IconButton>
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Article Image */}
      <Box sx={{ mb: 4 }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ width: '100%', height: 'auto', borderRadius: 8 }}
        />
      </Box>

      {/* Article Content */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
          {article.content}
        </Typography>
      </Paper>

      {/* Comments Section */}
      <Comments articleId={article.id} />

      {/* Related Articles */}
      <Typography variant="h6" gutterBottom>
        Related Articles
      </Typography>
      <Grid container spacing={4}>
        {relatedArticles.map((relatedArticle) => (
          <Grid item xs={12} sm={6} key={relatedArticle.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={relatedArticle.image}
                alt={relatedArticle.title}
              />
              <CardContent>
                <Chip
                  label={relatedArticle.category}
                  size="small"
                  color="primary"
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6" gutterBottom>
                  {relatedArticle.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {relatedArticle.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Article 