import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // यहाँ आप एरर को लॉग कर सकते हैं या एरर ट्रैकिंग सर्विस को भेज सकते हैं
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            p: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            कुछ गड़बड़ी हो गई है!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            हमें खेद है कि कुछ त्रुटि आ गई है। कृपया पेज को रिफ्रेश करें या बाद में पुनः प्रयास करें।
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            पेज रिफ्रेश करें
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 