import { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material'
import {
  Check as CheckIcon,
  Star as StarIcon,
  Diamond as DiamondIcon,
  WorkspacePremium as PremiumIcon,
} from '@mui/icons-material'

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹99',
      period: 'month',
      features: [
        'Ad-free reading experience',
        'Access to premium articles',
        'Daily newsletter',
        'Basic customer support',
      ],
      icon: <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹299',
      period: 'month',
      features: [
        'All Basic features',
        'Exclusive interviews',
        'Early access to articles',
        'Priority customer support',
        'Offline reading',
        'Custom news alerts',
      ],
      icon: <PremiumIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '₹999',
      period: 'month',
      features: [
        'All Premium features',
        'API access',
        'Custom integration',
        'Dedicated account manager',
        'Team collaboration tools',
        'Advanced analytics',
        'White-label solution',
      ],
      icon: <DiamondIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
  ]

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId)
    // TODO: Implement payment gateway integration
    console.log(`Subscribing to plan: ${planId}`)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Get unlimited access to premium content and exclusive features
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid item key={plan.id} xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                ...(plan.popular && {
                  border: '2px solid',
                  borderColor: 'primary.main',
                }),
              }}
            >
              {plan.popular && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  <Typography variant="caption" fontWeight="bold">
                    MOST POPULAR
                  </Typography>
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  {plan.icon}
                  <Typography variant="h4" component="h2" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" component="div" gutterBottom>
                    {plan.price}
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="text.secondary"
                    >
                      /{plan.period}
                    </Typography>
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    size="large"
                    fullWidth
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    Subscribe Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Why Subscribe?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Premium Content
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get access to exclusive articles, interviews, and in-depth analysis
              from our expert journalists.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Ad-Free Experience
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enjoy a clean, distraction-free reading experience without any
              advertisements.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Early Access
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Be the first to read breaking news and get early access to our
              premium content.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Subscription 