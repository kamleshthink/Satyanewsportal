import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, List, ListItem } from '@mui/material'
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material'

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#87CEEB',
        color: '#000000',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are dedicated to bringing you the latest news and updates from around the world.
              Our team of experienced journalists works tirelessly to provide accurate and timely information.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton href="#" aria-label="facebook" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton href="#" aria-label="twitter" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton href="#" aria-label="instagram" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton href="#" aria-label="youtube" color="inherit">
                <YouTubeIcon />
              </IconButton>
              <IconButton href="#" aria-label="linkedin" color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <List>
              <ListItem>
                <Link href="/" color="inherit" underline="hover">Home</Link>
              </ListItem>
              <ListItem>
                <Link href="/news" color="inherit" underline="hover">News</Link>
              </ListItem>
              <ListItem>
                <Link href="/about" color="inherit" underline="hover">About</Link>
              </ListItem>
              <ListItem>
                <Link href="/contact" color="inherit" underline="hover">Contact</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Categories
            </Typography>
            <List>
              <ListItem>
                <Link href="/category/technology" color="inherit" underline="hover">Technology</Link>
              </ListItem>
              <ListItem>
                <Link href="/category/business" color="inherit" underline="hover">Business</Link>
              </ListItem>
              <ListItem>
                <Link href="/category/sports" color="inherit" underline="hover">Sports</Link>
              </ListItem>
              <ListItem>
                <Link href="/category/entertainment" color="inherit" underline="hover">Entertainment</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: contact@newsportal.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 News Street, Media City
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body1" align="center" gutterBottom>
            "आपके द्वारा केवल सत्य समाचार"
          </Typography>
          <Typography variant="body2" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' Satya News. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer 