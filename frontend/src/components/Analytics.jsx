import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import {
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Comment as CommentIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'

function Analytics() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [timeRange, setTimeRange] = useState('Last 7 days')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
    handleClose()
  }

  const stats = {
    pageViews: {
      total: '1.2M',
      change: '+12.5%',
      trend: 'up',
    },
    uniqueVisitors: {
      total: '450K',
      change: '+8.3%',
      trend: 'up',
    },
    articles: {
      total: '156',
      change: '+5.2%',
      trend: 'up',
    },
    engagement: {
      total: '78%',
      change: '+3.1%',
      trend: 'up',
    },
  }

  const topArticles = [
    {
      id: 1,
      title: 'New Technological Revolution in India',
      views: '250K',
      engagement: '85%',
    },
    {
      id: 2,
      title: 'Global Climate Change Summit',
      views: '180K',
      engagement: '78%',
    },
    {
      id: 3,
      title: 'Sports Championship Results',
      views: '150K',
      engagement: '72%',
    },
  ]

  const userMetrics = [
    {
      metric: 'Average Time on Site',
      value: '4m 32s',
      change: '+15%',
    },
    {
      metric: 'Bounce Rate',
      value: '32%',
      change: '-8%',
    },
    {
      metric: 'Returning Visitors',
      value: '45%',
      change: '+12%',
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Analytics Dashboard
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ mr: 2 }}
          >
            Export Report
          </Button>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleTimeRangeChange('Last 24 hours')}>
              Last 24 hours
            </MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange('Last 7 days')}>
              Last 7 days
            </MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange('Last 30 days')}>
              Last 30 days
            </MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange('Last 3 months')}>
              Last 3 months
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Page Views</Typography>
              </Box>
              <Typography variant="h4">{stats.pageViews.total}</Typography>
              <Typography
                variant="body2"
                color={stats.pageViews.trend === 'up' ? 'success.main' : 'error.main'}
              >
                {stats.pageViews.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Unique Visitors</Typography>
              </Box>
              <Typography variant="h4">{stats.uniqueVisitors.total}</Typography>
              <Typography
                variant="body2"
                color={stats.uniqueVisitors.trend === 'up' ? 'success.main' : 'error.main'}
              >
                {stats.uniqueVisitors.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ArticleIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Articles</Typography>
              </Box>
              <Typography variant="h4">{stats.articles.total}</Typography>
              <Typography
                variant="body2"
                color={stats.articles.trend === 'up' ? 'success.main' : 'error.main'}
              >
                {stats.articles.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CommentIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Engagement</Typography>
              </Box>
              <Typography variant="h4">{stats.engagement.total}</Typography>
              <Typography
                variant="body2"
                color={stats.engagement.trend === 'up' ? 'success.main' : 'error.main'}
              >
                {stats.engagement.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Articles */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Top Performing Articles"
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <List>
                {topArticles.map((article) => (
                  <ListItem key={article.id}>
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={article.title}
                      secondary={`Views: ${article.views} | Engagement: ${article.engagement}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* User Metrics */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="User Metrics" />
            <CardContent>
              <List>
                {userMetrics.map((metric) => (
                  <ListItem key={metric.metric}>
                    <ListItemText
                      primary={metric.metric}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {metric.value}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={metric.change.startsWith('+') ? 'success.main' : 'error.main'}
                          >
                            {metric.change}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Analytics 