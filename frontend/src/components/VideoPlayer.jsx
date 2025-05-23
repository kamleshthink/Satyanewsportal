import { useState, useRef, useEffect } from 'react'
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullscreenIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from '@mui/icons-material'

function VideoPlayer({ video, relatedVideos }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [quality, setQuality] = useState('auto')
  const [showControls, setShowControls] = useState(true)
  const [bookmarked, setBookmarked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration)
      })
      video.addEventListener('timeupdate', () => {
        setCurrentTime(video.currentTime)
      })
    }
  }, [])

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  const handleTimeChange = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue
      setCurrentTime(newValue)
    }
  }

  const handleVolumeChange = (event, newValue) => {
    if (videoRef.current) {
      videoRef.current.volume = newValue
      setVolume(newValue)
      setMuted(newValue === 0)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality)
    setAnchorEl(null)
    // TODO: Implement quality change logic
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Sharing video:', video)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    // TODO: Implement bookmark functionality
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper
        sx={{
          position: 'relative',
          bgcolor: 'black',
          '&:hover .video-controls': {
            opacity: 1,
          },
        }}
      >
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          style={{ width: '100%', maxHeight: '70vh' }}
          onClick={handlePlayPause}
        />

        {/* Video Controls */}
        <Box
          className="video-controls"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            p: 1,
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <IconButton onClick={handlePlayPause} color="inherit">
                {playing ? <PauseIcon /> : <PlayIcon />}
              </IconButton>
            </Grid>

            <Grid item xs>
              <Slider
                value={currentTime}
                min={0}
                max={duration}
                onChange={handleTimeChange}
                sx={{ color: 'white' }}
              />
            </Grid>

            <Grid item>
              <Typography variant="caption" color="white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            </Grid>

            <Grid item>
              <IconButton onClick={handleMute} color="inherit">
                {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
            </Grid>

            <Grid item xs={2}>
              <Slider
                value={muted ? 0 : volume}
                min={0}
                max={1}
                step={0.1}
                onChange={handleVolumeChange}
                sx={{ color: 'white' }}
              />
            </Grid>

            <Grid item>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton onClick={handleFullscreen} color="inherit">
                <FullscreenIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Video Info */}
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {video.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mr: 2 }}>
            {video.views} views
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {video.date}
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          {video.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            variant="outlined"
            startIcon={bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            onClick={handleBookmark}
          >
            {bookmarked ? 'Saved' : 'Save'}
          </Button>
        </Box>
      </Box>

      {/* Related Videos */}
      <Typography variant="h6" gutterBottom>
        Related Videos
      </Typography>
      <Grid container spacing={2}>
        {relatedVideos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={video.thumbnail}
                alt={video.title}
              />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.views} views • {video.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quality Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          selected={quality === 'auto'}
          onClick={() => handleQualityChange('auto')}
        >
          Auto
        </MenuItem>
        <MenuItem
          selected={quality === '1080p'}
          onClick={() => handleQualityChange('1080p')}
        >
          1080p
        </MenuItem>
        <MenuItem
          selected={quality === '720p'}
          onClick={() => handleQualityChange('720p')}
        >
          720p
        </MenuItem>
        <MenuItem
          selected={quality === '480p'}
          onClick={() => handleQualityChange('480p')}
        >
          480p
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default VideoPlayer 