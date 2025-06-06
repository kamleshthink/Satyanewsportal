import React from 'react'
import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Chip,
  Paper,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material'
import {
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material'
import Newsletter from '../components/Newsletter'

function Home() {
  const [weather, setWeather] = useState(null)
  const [bookmarkedArticles, setBookmarkedArticles] = useState([])

  // Mock data for breaking news
  const breakingNews = [
    {
      id: 1,
      title: 'Breaking: Major Tech Innovation Announced',
      category: 'Technology',
      image: 'https://picsum.photos/400/200',
    },
    {
      id: 2,
      title: 'Global Economic Summit Results',
      category: 'Business',
      image: 'https://picsum.photos/400/201',
    },
  ]

  // Mock data for trending news
  const trendingNews = [
    {
      id: 1,
      title: 'New AI Technology Revolutionizes Healthcare',
      description: 'Artificial Intelligence is transforming the healthcare industry with breakthrough innovations.',
      category: 'Technology',
      image: 'https://picsum.photos/400/202',
      date: 'May 17, 2024',
      author: 'John Smith',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Startup Ecosystem Shows Remarkable Growth',
      description: 'The startup ecosystem is experiencing unprecedented growth with record investments.',
      category: 'Business',
      image: 'https://picsum.photos/400/203',
      date: 'May 16, 2024',
      author: 'Sarah Johnson',
      readTime: '4 min read',
    },
    {
      id: 3,
      title: 'Digital Transformation in Education',
      description: 'Educational institutions are rapidly adopting digital technologies for better learning outcomes.',
      category: 'Education',
      image: 'https://picsum.photos/400/204',
      date: 'May 15, 2024',
      author: 'Michael Brown',
      readTime: '6 min read',
    },
  ]

  // Mock data for editor's pick
  const editorsPick = [
    {
      id: 1,
      title: 'The Future of Renewable Energy',
      category: 'Environment',
      image: 'https://picsum.photos/400/205',
      date: 'May 17, 2024',
    },
    {
      id: 2,
      title: 'Space Exploration: New Discoveries',
      category: 'Science',
      image: 'https://picsum.photos/400/206',
      date: 'May 16, 2024',
    },
  ]

  // Mock data for live news ticker
  const liveNews = [
    'Breaking: New Climate Agreement Signed',
    'Sports: Team Wins Championship',
    'Technology: New Smartphone Launch',
    'Business: Stock Market Hits New High',
  ]

  useEffect(() => {
    // Simulate weather API call
    setWeather({
      temperature: '25°C',
      condition: 'Sunny',
      location: 'New Delhi',
    })
  }, [])

  const handleBookmark = (articleId) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    )
  }

  const handleShare = (article) => {
    // Implement share functionality
    console.log('Sharing article:', article)
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Weather Widget */}
      {weather && (
        <Paper
          sx={{
            p: 2,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1">{weather.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              {weather.temperature}
            </Typography>
            <Typography variant="subtitle1">{weather.condition}</Typography>
          </Box>
        </Paper>
      )}

      {/* Live News Ticker */}
      <Paper
        sx={{
          p: 2,
          mb: 4,
          bgcolor: 'error.main',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            animation: 'ticker 20s linear infinite',
            '@keyframes ticker': {
              '0%': { transform: 'translateX(100%)' },
              '100%': { transform: 'translateX(-100%)' },
            },
          }}
        >
          {liveNews.map((news, index) => (
            <Typography
              key={index}
              variant="subtitle1"
              sx={{ mr: 4, whiteSpace: 'nowrap' }}
            >
              {news}
            </Typography>
          ))}
        </Box>
      </Paper>

      {/* Breaking News Section */}
      <Paper
        sx={{
          p: 2,
          mb: 4,
          bgcolor: 'error.main',
          color: 'white',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Breaking News
        </Typography>
        <Grid container spacing={2}>
          {breakingNews.map((article) => (
            <Grid item xs={12} md={6} key={article.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={article.image}
                  alt={article.title}
                />
                <CardContent>
                  <Chip
                    label={article.category}
                    size="small"
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="h6" component="div">
                    {article.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Trending News Section */}
      <Typography variant="h5" gutterBottom>
        Trending News
      </Typography>
      <Grid container spacing={2}>
        {trendingNews.map((article) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
              />
              <CardContent>
                <Chip
                  label={article.category}
                  size="small"
                  color="primary"
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6" component="div" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {article.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    {article.readTime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mx: 1 }}>
                    •
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {article.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    size="small"
                    startIcon={
                      bookmarkedArticles.includes(article.id) ? (
                        <BookmarkIcon />
                      ) : (
                        <BookmarkBorderIcon />
                      )
                    }
                    onClick={() => handleBookmark(article.id)}
                  >
                    {bookmarkedArticles.includes(article.id) ? 'Saved' : 'Save'}
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => handleShare(article)}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Editor's Pick Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Editor's Pick
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={editorsPick[0].image}
              alt={editorsPick[0].title}
            />
            <CardContent>
              <Chip
                label={editorsPick[0].category}
                size="small"
                color="primary"
                sx={{ mb: 1 }}
              />
              <Typography variant="h5" component="div" gutterBottom>
                {editorsPick[0].title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {editorsPick[0].date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} key={editorsPick[1].id}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={editorsPick[1].image}
              alt={editorsPick[1].title}
            />
            <CardContent>
              <Chip
                label={editorsPick[1].category}
                size="small"
                color="primary"
                sx={{ mb: 1 }}
              />
              <Typography variant="h6" component="div" gutterBottom>
                {editorsPick[1].title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {editorsPick[1].date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Newsletter Section */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Newsletter />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home 