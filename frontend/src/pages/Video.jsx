import { useState, useEffect } from 'react'
import { Container, Typography, Box, Tabs, Tab } from '@mui/material'
import VideoPlayer from '../components/VideoPlayer'

function Video() {
  const [tabValue, setTabValue] = useState(0)
  const [video, setVideo] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])

  useEffect(() => {
    // TODO: Fetch video data from API
    // Mock data for demonstration
    setVideo({
      id: 1,
      title: 'Breaking News: Major Tech Innovation',
      description: 'A revolutionary breakthrough in technology that will change the way we live.',
      url: 'https://example.com/video.mp4',
      thumbnail: 'https://picsum.photos/800/450',
      views: '1.2M',
      date: 'May 17, 2024',
      category: 'Technology',
    })

    setRelatedVideos([
      {
        id: 2,
        title: 'The Future of AI',
        thumbnail: 'https://picsum.photos/400/225',
        views: '500K',
        date: 'May 16, 2024',
      },
      {
        id: 3,
        title: 'Tech Trends 2024',
        thumbnail: 'https://picsum.photos/400/226',
        views: '300K',
        date: 'May 15, 2024',
      },
      {
        id: 4,
        title: 'Digital Transformation',
        thumbnail: 'https://picsum.photos/400/227',
        views: '200K',
        date: 'May 14, 2024',
      },
    ])
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  if (!video) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Latest Videos" />
          <Tab label="Popular Videos" />
          <Tab label="Featured Videos" />
        </Tabs>
      </Box>

      <VideoPlayer video={video} relatedVideos={relatedVideos} />
    </Container>
  )
}

export default Video 