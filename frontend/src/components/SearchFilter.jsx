import { useState } from 'react'
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Divider,
} from '@mui/material'
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material'

const categories = [
  'World',
  'Politics',
  'Business',
  'Technology',
  'Sports',
  'Entertainment',
]

const dateRanges = [
  'Last 24 hours',
  'Last 7 days',
  'Last 30 days',
  'Last 3 months',
  'Last year',
]

function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [dateRange, setDateRange] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [popularSearches] = useState([
    'Breaking News',
    'Technology',
    'Politics',
    'Sports',
    'Entertainment',
  ])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value)
  }

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value)
  }

  const handleFilterToggle = () => {
    setShowFilters(!showFilters)
  }

  const handleSearch = () => {
    // TODO: Implement search logic
    console.log('Searching with:', {
      query: searchQuery,
      categories: selectedCategories,
      dateRange,
    })
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Popular Searches:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {popularSearches.map((search) => (
              <Chip
                key={search}
                label={search}
                onClick={() => setSearchQuery(search)}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            startIcon={<FilterListIcon />}
            onClick={handleFilterToggle}
            variant="outlined"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!searchQuery}
          >
            Search
          </Button>
        </Box>

        {showFilters && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Date Range</InputLabel>
                  <Select
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <DateRangeIcon />
                      </InputAdornment>
                    }
                  >
                    {dateRanges.map((range) => (
                      <MenuItem key={range} value={range}>
                        {range}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default SearchFilter 