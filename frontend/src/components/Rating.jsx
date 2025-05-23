import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Rating as MuiRating,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from '@mui/icons-material'

function Rating() {
  const [ratings, setRatings] = useState([
    {
      id: 1,
      user: {
        name: 'राहुल शर्मा',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      rating: 4.5,
      comment: 'बहुत अच्छा लेख है। मैंने इससे बहुत कुछ सीखा।',
      timestamp: '2 घंटे पहले',
      helpful: 15,
      notHelpful: 2,
    },
    {
      id: 2,
      user: {
        name: 'प्रिया पटेल',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      rating: 5,
      comment: 'मैं भी सहमत हूं। बहुत जानकारीपूर्ण है।',
      timestamp: '1 घंटा पहले',
      helpful: 8,
      notHelpful: 0,
    },
  ])

  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [averageRating, setAverageRating] = useState(4.75)
  const [totalRatings, setTotalRatings] = useState(2)

  const handleRatingSubmit = () => {
    if (userRating > 0) {
      const newRating = {
        id: Date.now(),
        user: {
          name: 'वर्तमान उपयोगकर्ता',
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
        rating: userRating,
        comment: userComment,
        timestamp: 'अभी',
        helpful: 0,
        notHelpful: 0,
      }

      setRatings((prev) => [newRating, ...prev])
      setUserRating(0)
      setUserComment('')
      setShowRatingDialog(false)

      // Update average rating
      const newTotal = totalRatings + 1
      const newAverage = ((averageRating * totalRatings) + userRating) / newTotal
      setAverageRating(newAverage)
      setTotalRatings(newTotal)
    }
  }

  const handleHelpful = (ratingId) => {
    setRatings((prev) =>
      prev.map((rating) =>
        rating.id === ratingId
          ? { ...rating, helpful: rating.helpful + 1 }
          : rating
      )
    )
  }

  const handleNotHelpful = (ratingId) => {
    setRatings((prev) =>
      prev.map((rating) =>
        rating.id === ratingId
          ? { ...rating, notHelpful: rating.notHelpful + 1 }
          : rating
      )
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        रेटिंग और समीक्षाएँ
      </Typography>

      {/* Rating Summary */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="div">
                  {averageRating.toFixed(1)}
                </Typography>
                <MuiRating
                  value={averageRating}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <Typography variant="body2" color="text.secondary">
                  {totalRatings} रेटिंग्स
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ width: 100 }}>
                  5 स्टार
                </Typography>
                <Box sx={{ flexGrow: 1, mx: 2 }}>
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'grey.200',
                      borderRadius: 1,
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        width: '80%',
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="body2">80%</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ width: 100 }}>
                  4 स्टार
                </Typography>
                <Box sx={{ flexGrow: 1, mx: 2 }}>
                  <Box
                    sx={{
                      height: 8,
                      bgcolor: 'grey.200',
                      borderRadius: 1,
                      width: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        bgcolor: 'primary.main',
                        borderRadius: 1,
                        width: '20%',
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="body2">20%</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Rating Button */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowRatingDialog(true)}
        >
          अपनी रेटिंग दें
        </Button>
      </Box>

      {/* Ratings List */}
      <List>
        {ratings.map((rating) => (
          <Box key={rating.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={rating.user.avatar} alt={rating.user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography component="span" variant="subtitle1">
                      {rating.user.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {rating.timestamp}
                    </Typography>
                  </Box>
                }
                secondary={
                  <>
                    <MuiRating
                      value={rating.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ my: 1 }}
                    />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      {rating.comment}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Button
                        size="small"
                        startIcon={<ThumbUpIcon />}
                        onClick={() => handleHelpful(rating.id)}
                      >
                        मददगार ({rating.helpful})
                      </Button>
                      <Button
                        size="small"
                        startIcon={<ThumbDownIcon />}
                        onClick={() => handleNotHelpful(rating.id)}
                      >
                        मददगार नहीं ({rating.notHelpful})
                      </Button>
                    </Box>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onClose={() => setShowRatingDialog(false)}>
        <DialogTitle>अपनी रेटिंग दें</DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <MuiRating
              value={userRating}
              onChange={(event, newValue) => setUserRating(newValue)}
              precision={0.5}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="अपनी समीक्षा लिखें..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRatingDialog(false)}>रद्द करें</Button>
          <Button
            onClick={handleRatingSubmit}
            variant="contained"
            disabled={userRating === 0}
          >
            सबमिट करें
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Rating 