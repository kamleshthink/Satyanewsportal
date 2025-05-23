import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material'
import {
  Search as SearchIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material'
import NewsComponent from '../components/NewsComponent'

function Category() {
  const { category } = useParams()
  const [tabValue, setTabValue] = useState(0)
  const [sortBy, setSortBy] = useState('latest')
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Category Header */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          All articles in this category
        </Typography>
      </Paper>

      {/* Filters and Search */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="All" />
            </Tabs>
          </Grid>
        </Grid>
      </Box>

      {/* News Component to display articles */}
      <NewsComponent category={category} />
    </Container>
  )
}

export default Category 