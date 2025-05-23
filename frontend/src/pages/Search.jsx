import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
} from '@mui/material'
import { Search as SearchIcon, Clear } from '@mui/icons-material'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: 'New Technological Revolution in India',
      description: 'India\'s progress in Artificial Intelligence and Machine Learning',
      image: 'https://picsum.photos/400/200',
      category: 'Technology',
      date: 'May 17, 2024',
    },
    {
      id: 2,
      title: 'Startup Ecosystem Development',
      description: 'Global impact of Indian startups',
      image: 'https://picsum.photos/400/201',
      category: 'Business',
      date: 'May 16, 2024',
    },
    {
      id: 3,
      title: 'Digital India Success',
      description: 'Impact of digital initiatives on the country',
      image: 'https://picsum.photos/400/202',
      category: 'Technology',
      date: 'May 15, 2024',
    },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ q: searchQuery })
  }

  const handleClear = () => {
    setSearchQuery('')
    setSearchParams({})
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search Results
        </Typography>
        
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} edge="end">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {searchQuery && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Found {searchResults.length} results for "{searchQuery}"
          </Typography>
        )}
      </Box>

      <Grid container spacing={4}>
        {searchResults.map((result) => (
          <Grid item key={result.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={result.image}
                alt={result.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Chip
                    label={result.category}
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="span"
                  >
                    {result.date}
                  </Typography>
                </Box>
                <Typography gutterBottom variant="h6" component="h2">
                  {result.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {result.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Search 