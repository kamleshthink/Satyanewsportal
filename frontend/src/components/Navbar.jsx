import React from 'react'
import { useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
  Badge,
  useTheme,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4,
  Brightness7,
  Bookmark as BookmarkIcon,
  KeyboardArrowDown,
} from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../ChatGPT Image May 20, 2025, 01_43_56 AM.png'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const categories = [
  { 
    title: 'World',
    path: '/category/world',
    subcategories: [
      { title: 'International Politics', path: '/category/world/international-politics' },
      { title: 'Global Economy', path: '/category/world/global-economy' },
      { title: 'UN & Diplomatic Affairs', path: '/category/world/un-diplomatic-affairs' },
      { title: 'Conflicts & Peace', path: '/category/world/conflicts-peace' },
      { title: 'Environment & Climate Change', path: '/category/world/environment-climate-change' },
      { title: 'International Summits', path: '/category/world/international-summits' },
      { title: 'Country Spotlights', path: '/category/world/country-spotlights' },
    ]
  },
   { 
    title: 'Politics',
    path: '/category/politics',
    subcategories: [
      { title: 'Indian Politics', path: '/category/politics/indian-politics' },
      { title: 'Elections & Voting', path: '/category/politics/elections-voting' },
      { title: 'Government Policies', path: '/category/politics/government-policies' },
      { title: 'Parliament Updates', path: '/category/politics/parliament-updates' },
      { title: 'Political Analysis', path: '/category/politics/political-analysis' },
      { title: 'State Politics', path: '/category/politics/state-politics' },
      { title: 'Political Scandals', path: '/category/politics/political-scandals' },
    ]
  },
  { 
    title: 'Business',
    path: '/category/business',
    subcategories: [
      { title: 'Indian Economy', path: '/category/business/indian-economy' },
      { title: 'Startups & Entrepreneurship', path: '/category/business/startups-entrepreneurship' },
      { title: 'Market Trends', path: '/category/business/market-trends' },
      { title: 'Stock Market & Investment', path: '/category/business/stock-market-investment' },
      { title: 'Banking & Finance', path: '/category/business/banking-finance' },
      { title: 'Trade & Commerce', path: '/category/business/trade-commerce' },
      { title: 'Cryptocurrency & Blockchain', path: '/category/business/cryptocurrency-blockchain' },
    ]
  },
  { 
    title: 'Technology',
    path: '/category/technology',
    subcategories: [
      { title: 'New Launches', path: '/category/technology/new-launches' },
      { title: 'Gadgets & Reviews', path: '/category/technology/gadgets-reviews' },
      { title: 'Artificial Intelligence', path: '/category/technology/artificial-intelligence' },
      { title: 'Cybersecurity', path: '/category/technology/cybersecurity' },
      { title: 'Space & Research', path: '/category/technology/space-research' },
      { title: 'Tech Companies', path: '/category/technology/tech-companies' },
      { title: 'Innovations & Startups', path: '/category/technology/innovations-startups' },
    ]
  },
  { 
    title: 'Sports',
    path: '/category/sports',
    subcategories: [
      { title: 'Cricket', path: '/category/sports/cricket' },
      { title: 'Football', path: '/category/sports/football' },
      { title: 'Olympic Sports', path: '/category/sports/olympic-sports' },
      { title: 'Indian Sports Personalities', path: '/category/sports/indian-sports-personalities' },
      { title: 'Match Highlights', path: '/category/sports/match-highlights' },
      { title: 'eSports', path: '/category/sports/esports' },
      { title: 'Tournaments & Fixtures', path: '/category/sports/tournaments-fixtures' },
    ]
  },
  { 
    title: 'Entertainment',
    path: '/category/entertainment',
    subcategories: [
      { title: 'Bollywood', path: '/category/entertainment/bollywood' },
      { title: 'OTT Releases', path: '/category/entertainment/ott-releases' },
      { title: 'Celebrity News', path: '/category/entertainment/celebrity-news' },
      { title: 'Movie Reviews', path: '/category/entertainment/movie-reviews' },
      { title: 'Music & Concerts', path: '/category/entertainment/music-concerts' },
      { title: 'Awards & Events', path: '/category/awards-events' },
      { title: 'Regional Cinema', path: '/category/regional-cinema' },
    ]
  },
];

const settings = [
  { title: 'Profile', path: '/profile' },
  { title: 'Saved Articles', path: '/saved' },
  { title: 'Settings', path: '/settings' },
  { title: 'Subscription', path: '/subscription' },
  { title: 'Videos', path: '/video' },
  { title: 'Editor', path: '/editor' },
  { title: 'Review', path: '/review' },
  { title: 'Roles', path: '/roles' },
  { title: 'Social', path: '/social' },
  { title: 'Logout', path: '/logout' },
];

function Navbar({ toggleColorMode, mode }) {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElCategory, setAnchorElCategory] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const theme = useTheme()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenCategoryMenu = (event, category) => {
    setAnchorElCategory(event.currentTarget)
    setSelectedCategory(category)
  }

  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null)
    setSelectedCategory(null)
  }

  // Function to handle closing menu after a delay for hover
  const handleCloseCategoryMenuDelayed = () => {
    setTimeout(() => {
      if (!document.elementFromPoint(event.clientX, event.clientY)?.closest('.MuiMenu-paper')) {
        handleCloseCategoryMenu()
      }
    }, 50)
  }

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?q=${searchQuery}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    handleCloseUserMenu()
    navigate('/signin')
  }

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for large screens */}
          <Box
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt="Satya Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'inherit',
              }}
            >
              Satya
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {categories.map((category) => [
                <MenuItem
                  key={category.title}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={category.path}
                >
                  <Typography textAlign="center">{category.title}</Typography>
                </MenuItem>,
                category.subcategories && category.subcategories.map((sub) => (
                  <MenuItem
                    key={sub.title}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={sub.path}
                    sx={{ pl: 4 }}
                  >
                    <Typography textAlign="center">{sub.title}</Typography>
                  </MenuItem>
                )),
              ])}
               {/* Added sign-in required pages to mobile menu for demonstration */}
               {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={setting.path}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
               <MenuItem component={Link} to="/signin" onClick={handleCloseNavMenu}>
                 <Typography textAlign="center">Sign In</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo for mobile screens */}
          <Box
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img src={logo} alt="Satya Logo" style={{ height: '30px', marginRight: '10px' }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'inherit',
              }}
            >
              Satya
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {categories.map((category) => (
              <Box
                key={category.title}
                onMouseEnter={(event) => handleOpenCategoryMenu(event, category)}
                onMouseLeave={handleCloseCategoryMenuDelayed}
              >
                <Button
                  aria-owns={anchorElCategory ? 'category-menu' : undefined}
                  aria-haspopup="true"
                  onClick={(event) => handleOpenCategoryMenu(event, category)} // Keep onClick for fallback/accessibility
                  sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }}
                >
                  {category.title}
                  {category.subcategories && <KeyboardArrowDown />}
                </Button>
                <Menu
                  id="category-menu"
                  anchorEl={anchorElCategory}
                  open={Boolean(anchorElCategory) && selectedCategory?.title === category.title}
                  onClose={handleCloseCategoryMenu}
                  MenuListProps={{
                    onMouseLeave: handleCloseCategoryMenuDelayed,
                  }}
                >
                  {selectedCategory?.title === category.title && category.subcategories.map((sub) => (
                    <MenuItem
                      key={sub.title}
                      onClick={handleCloseCategoryMenu}
                      component={Link}
                      to={sub.path}
                    >
                      <Typography textAlign="center">{sub.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>

          {/* Search bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
            />
          </Search>

          {/* Icons and Auth */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {/* Theme toggle */}
            <IconButton onClick={toggleColorMode} color="inherit" sx={{ p: 1, fontSize: '1rem' }}>
              {mode === 'dark' ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
            </IconButton>

            {/* Notifications */}
            <IconButton sx={{ ml: 1, p: 1 }} color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>

            {/* Authentication button or User menu */}
            {!user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Button
                  component={Link}
                  to="/signin"
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: '#87CEEB',
                    color: '#000000',
                    borderRadius: '50px',
                    px: 1.5,
                    py: 0.5,
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                  }}
                >
                  Sign In
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name || "User"} src="/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem 
                      key={setting.title} 
                      onClick={setting.title === 'Logout' ? handleLogout : handleCloseUserMenu}
                      component={Link}
                      to={setting.path}
                    >
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;