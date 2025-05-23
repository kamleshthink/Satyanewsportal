import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Reply as ReplyIcon,
  MoreVert as MoreVertIcon,
  Flag as FlagIcon,
} from '@mui/icons-material'

function Comments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'Rahul Sharma',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: 'बहुत अच्छा लेख है। मैंने इससे बहुत कुछ सीखा।',
      timestamp: '2 hours ago',
      likes: 15,
      dislikes: 2,
      replies: [
        {
          id: 2,
          user: {
            name: 'Priya Patel',
            avatar: 'https://i.pravatar.cc/150?img=2',
          },
          content: 'मैं भी सहमत हूं। बहुत जानकारीपूर्ण है।',
          timestamp: '1 hour ago',
          likes: 5,
          dislikes: 0,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: 'Amit Kumar',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      content: 'कुछ और जानकारी जोड़ी जा सकती है।',
      timestamp: '3 hours ago',
      likes: 8,
      dislikes: 1,
      replies: [],
    },
  ])

  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedComment, setSelectedComment] = useState(null)
  const [reportDialog, setReportDialog] = useState(false)

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        user: {
          name: 'Current User',
          avatar: 'https://i.pravatar.cc/150?img=4',
        },
        content: newComment,
        timestamp: 'Just now',
        likes: 0,
        dislikes: 0,
        replies: [],
      }

      if (replyTo) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === replyTo
              ? { ...c, replies: [...c.replies, comment] }
              : c
          )
        )
        setReplyTo(null)
      } else {
        setComments((prev) => [comment, ...prev])
      }
      setNewComment('')
    }
  }

  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget)
    setSelectedComment(comment)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedComment(null)
  }

  const handleReport = () => {
    setReportDialog(true)
    handleMenuClose()
  }

  const handleLike = (commentId, isReply = false) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            ),
          }
        }
        return comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      })
    )
  }

  const handleDislike = (commentId, isReply = false) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? { ...reply, dislikes: reply.dislikes + 1 }
                : reply
            ),
          }
        }
        return comment.id === commentId
          ? { ...comment, dislikes: comment.dislikes + 1 }
          : comment
      })
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        टिप्पणियाँ
      </Typography>

      {/* Comment Input */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="अपनी टिप्पणी लिखें..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          disabled={!newComment.trim()}
        >
          टिप्पणी पोस्ट करें
        </Button>
      </Box>

      {/* Comments List */}
      <List>
        {comments.map((comment) => (
          <Box key={comment.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={comment.user.avatar} alt={comment.user.name} />
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
                      {comment.user.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, comment)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      {comment.content}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleLike(comment.id)}
                      >
                        <ThumbUpIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption">
                        {comment.likes}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleDislike(comment.id)}
                      >
                        <ThumbDownIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption">
                        {comment.dislikes}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<ReplyIcon />}
                        onClick={() => setReplyTo(comment.id)}
                      >
                        जवाब दें
                      </Button>
                      <Typography variant="caption" color="text.secondary">
                        {comment.timestamp}
                      </Typography>
                    </Box>
                  </>
                }
              />
            </ListItem>

            {/* Replies */}
            {comment.replies.map((reply) => (
              <ListItem
                key={reply.id}
                alignItems="flex-start"
                sx={{ pl: 9 }}
              >
                <ListItemAvatar>
                  <Avatar src={reply.user.avatar} alt={reply.user.name} />
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
                      <Typography component="span" variant="subtitle2">
                        {reply.user.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, reply)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block', mb: 1 }}
                      >
                        {reply.content}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleLike(reply.id, true)}
                        >
                          <ThumbUpIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption">
                          {reply.likes}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleDislike(reply.id, true)}
                        >
                          <ThumbDownIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption">
                          {reply.dislikes}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reply.timestamp}
                        </Typography>
                      </Box>
                    </>
                  }
                />
              </ListItem>
            ))}
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>

      {/* Comment Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleReport}>
          <FlagIcon fontSize="small" sx={{ mr: 1 }} />
          रिपोर्ट करें
        </MenuItem>
      </Menu>

      {/* Report Dialog */}
      <Dialog open={reportDialog} onClose={() => setReportDialog(false)}>
        <DialogTitle>टिप्पणी रिपोर्ट करें</DialogTitle>
        <DialogContent>
          <Typography>
            क्या आप वाकई इस टिप्पणी को रिपोर्ट करना चाहते हैं?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialog(false)}>रद्द करें</Button>
          <Button onClick={() => setReportDialog(false)} color="error">
            रिपोर्ट करें
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Comments 