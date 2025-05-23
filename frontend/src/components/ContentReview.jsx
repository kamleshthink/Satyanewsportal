import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Badge,
  Tooltip,
} from '@mui/material'
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Comment as CommentIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from '@mui/icons-material'

function ContentReview() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [commentDialog, setCommentDialog] = useState(false)
  const [comment, setComment] = useState('')
  const [historyDialog, setHistoryDialog] = useState(false)

  // Mock data for articles under review
  const articles = [
    {
      id: 1,
      title: 'Breaking News: Major Tech Innovation',
      author: 'John Doe',
      category: 'Technology',
      status: 'review',
      submittedDate: '2024-05-17',
      lastModified: '2024-05-17',
      comments: [
        {
          id: 1,
          user: 'Jane Smith',
          role: 'Editor',
          comment: 'Please add more details about the innovation.',
          timestamp: '2024-05-17 10:30',
        },
      ],
      history: [
        {
          id: 1,
          action: 'Created',
          user: 'John Doe',
          timestamp: '2024-05-17 09:00',
        },
        {
          id: 2,
          action: 'Submitted for Review',
          user: 'John Doe',
          timestamp: '2024-05-17 09:30',
        },
      ],
    },
    {
      id: 2,
      title: 'Sports Update: Championship Results',
      author: 'Mike Johnson',
      category: 'Sports',
      status: 'draft',
      submittedDate: '2024-05-16',
      lastModified: '2024-05-17',
      comments: [],
      history: [
        {
          id: 1,
          action: 'Created',
          user: 'Mike Johnson',
          timestamp: '2024-05-16 15:00',
        },
      ],
    },
  ]

  const handleApprove = (articleId) => {
    // TODO: Implement approve functionality
    console.log('Approving article:', articleId)
  }

  const handleReject = (articleId) => {
    setCommentDialog(true)
    setSelectedArticle(articleId)
  }

  const handleComment = (articleId) => {
    setCommentDialog(true)
    setSelectedArticle(articleId)
  }

  const handleHistory = (articleId) => {
    setHistoryDialog(true)
    setSelectedArticle(articleId)
  }

  const handleCommentSubmit = () => {
    // TODO: Implement comment submission
    console.log('Submitting comment:', comment)
    setCommentDialog(false)
    setComment('')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft':
        return 'default'
      case 'review':
        return 'warning'
      case 'approved':
        return 'success'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Content Review
      </Typography>

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} key={article.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{article.title}</Typography>
                  <Chip
                    label={article.status.toUpperCase()}
                    color={getStatusColor(article.status)}
                    size="small"
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Author: {article.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {article.category}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Submitted: {article.submittedDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last Modified: {article.lastModified}
                    </Typography>
                  </Grid>
                </Grid>

                {article.comments.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Comments ({article.comments.length})
                    </Typography>
                    <List dense>
                      {article.comments.map((comment) => (
                        <ListItem key={comment.id}>
                          <ListItemAvatar>
                            <Avatar>
                              <PersonIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={comment.comment}
                            secondary={`${comment.user} (${comment.role}) - ${comment.timestamp}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>

              <CardActions>
                <Button
                  startIcon={<ApproveIcon />}
                  color="success"
                  onClick={() => handleApprove(article.id)}
                >
                  Approve
                </Button>
                <Button
                  startIcon={<RejectIcon />}
                  color="error"
                  onClick={() => handleReject(article.id)}
                >
                  Reject
                </Button>
                <Button
                  startIcon={<CommentIcon />}
                  onClick={() => handleComment(article.id)}
                >
                  Comment
                </Button>
                <Button
                  startIcon={<HistoryIcon />}
                  onClick={() => handleHistory(article.id)}
                >
                  History
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Comment Dialog */}
      <Dialog open={commentDialog} onClose={() => setCommentDialog(false)}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentDialog(false)}>Cancel</Button>
          <Button onClick={handleCommentSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* History Dialog */}
      <Dialog
        open={historyDialog}
        onClose={() => setHistoryDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Article History</DialogTitle>
        <DialogContent>
          <List>
            {selectedArticle &&
              articles
                .find((a) => a.id === selectedArticle)
                ?.history.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <HistoryIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.action}
                      secondary={`${item.user} - ${item.timestamp}`}
                    />
                  </ListItem>
                ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default ContentReview 