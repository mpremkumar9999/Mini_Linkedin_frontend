import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import PostForm from '../components/Feed/PostForm';
import PostList from '../components/Feed/PostList';
import API from '../api/axios';
import {
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  Avatar, 
  Divider, 
  TextField, 
  InputAdornment,
  IconButton, 
  Chip, 
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Grid,
  Stack,
  Card,
  CardContent,
  CardActions,
  Fade
} from '@mui/material';
import { 
  Search, 
  ConnectWithoutContact, 
  RocketLaunch, 
  Logout, 
  MoreVert,
  Login,
  HowToReg,
  Groups,
  Work,
  Article
} from '@mui/icons-material';

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [postSearchTerm, setPostSearchTerm] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (user) {
      API.get('/users')
        .then(res => {
          const others = res.data
            .filter(u => u._id !== user._id)
            .sort(() => 0.5 - Math.random());
          setUsers(others);
        })
        .catch(console.error);
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    setRefresh(r => !r);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goProfile = (id) => navigate(`/profile/${id}`);

  const toggleSuggestions = () => setShowSuggestions(!showSuggestions);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  mb: 3
                }}
              >
                Welcome to Mini-LinkedIn
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Connect with professionals and grow your network
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Join our community to share posts, connect with others, and discover new opportunities.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  startIcon={<Login />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  size="large"
                  startIcon={<HowToReg />}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Register
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                borderRadius: 4,
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Stack spacing={3}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Groups color="primary" sx={{ fontSize: 40, mr: 2 }} />
                      <Typography variant="h6">Build Your Network</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Connect with professionals in your field and expand your opportunities.
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Work color="primary" sx={{ fontSize: 40, mr: 2 }} />
                      <Typography variant="h6">Discover Opportunities</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Find job postings, collaborations, and projects that match your skills.
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Article color="primary" sx={{ fontSize: 40, mr: 2 }} />
                      <Typography variant="h6">Share Your Expertise</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Post articles, share insights, and engage with your community.
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography 
          variant="h4" 
          fontWeight="bold"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          Mini-LinkedIn
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          {isMobile && (
            <>
              <IconButton onClick={handleMenuClick} sx={{ color: theme.palette.text.primary }}>
                <MoreVert />
              </IconButton>
              <Menu 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)} 
                onClose={handleMenuClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => { toggleSuggestions(); handleMenuClose(); }}>
                  {showSuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
                </MenuItem>
              </Menu>
            </>
          )}
          <IconButton 
            onClick={handleLogout}
            sx={{
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.error.main
              }
            }}
          >
            <Logout />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Layout */}
      {isMobile ? (
        <Box>
          {/* Create Post Button */}
          {!showPostForm && (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setShowPostForm(true)}
              sx={{ 
                mb: 2,
                py: 1.5,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                }
              }}
            >
              Create a Post
            </Button>
          )}

          {/* Post Form */}
          {showPostForm && (
            <Paper sx={{ 
              p: 2, 
              mb: 2,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              {/* Added user profile at top of post form */}
              <Box 
                display="flex" 
                alignItems="center" 
                mb={2}
                onClick={() => goProfile(user._id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: 1
                  },
                  p: 1
                }}
              >
                <Avatar 
                  src={user.avatar} 
                  sx={{ 
                    mr: 2,
                    width: 48,
                    height: 48,
                    border: `2px solid ${theme.palette.primary.main}`
                  }} 
                />
                <Box>
                  <Typography fontWeight="medium">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Posting as yourself</Typography>
                </Box>
              </Box>
              <PostForm onPost={() => { setShowPostForm(false); setRefresh(r => !r); }} />
            </Paper>
          )}

          {/* Post Search */}
          <Paper 
            component="form" 
            onSubmit={handleSearch} 
            sx={{ 
              mb: 2, 
              p: 2,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <TextField
              fullWidth
              placeholder="Search posts..."
              value={postSearchTerm}
              onChange={(e) => setPostSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 3,
                }
              }}
            />
          </Paper>

          {/* Suggested Connections (toggle) */}
          {showSuggestions && (
            <Paper sx={{ 
              mb: 2, 
              p: 2,
              borderRadius: 3,
              background: theme.palette.background.paper,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              maxHeight: 400,
              overflowY: 'auto'
            }}>
              <Box display="flex" alignItems="center" mb={1}>
                <ConnectWithoutContact color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Suggested Connections</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {/* Removed the slice(0, 5) to show all users with scroll */}
              {users.map((u) => (
                <Box 
                  key={u._id} 
                  display="flex" 
                  alignItems="center" 
                  mb={2}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <Avatar 
                    src={u.avatar} 
                    sx={{ 
                      mr: 2,
                      width: 48,
                      height: 48,
                      border: `2px solid ${theme.palette.primary.main}`
                    }} 
                  />
                  <Box flexGrow={1}>
                    <Typography fontWeight="medium">{u.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{u.bio || u.email}</Typography>
                  </Box>
                  <Chip 
                    label="Connect" 
                    variant="outlined" 
                    color="primary"
                    clickable
                  />
                </Box>
              ))}
            </Paper>
          )}

          {/* Posts */}
          <PostList key={`${refresh}-${postSearchTerm}`} searchTerm={postSearchTerm} />
        </Box>
      ) : (
        // Desktop Layout
        <Box display="flex" gap={4}>
          {/* Left Side - Post Form + Suggestions */}
          <Box sx={{ width: '30%' }}>
            <Paper sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              {/* Added user profile at top of post form */}
              <Box 
                display="flex" 
                alignItems="center" 
                mb={2}
                onClick={() => goProfile(user._id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: 1
                  },
                  p: 1
                }}
              >
                <Avatar 
                  src={user.avatar} 
                  sx={{ 
                    mr: 2,
                    width: 48,
                    height: 48,
                    border: `2px solid ${theme.palette.primary.main}`
                  }} 
                />
                <Box>
                  <Typography fontWeight="medium">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Posting as yourself</Typography>
                </Box>
              </Box>
              <PostForm onPost={() => setRefresh(r => !r)} />
            </Paper>
            <Paper sx={{ 
              p: 3, 
              maxHeight: 400, 
              overflowY: 'auto',
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <Box display="flex" alignItems="center" mb={2}>
                <ConnectWithoutContact color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Suggested Connections</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {/* Removed the slice(0, 5) to show all users with scroll */}
              {users.map((u) => (
                <Box 
                  key={u._id} 
                  display="flex" 
                  alignItems="center" 
                  mb={2}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Avatar 
                    src={u.avatar} 
                    sx={{ 
                      mr: 2,
                      width: 48,
                      height: 48,
                      border: `2px solid ${theme.palette.primary.main}`
                    }} 
                  />
                  <Box flexGrow={1}>
                    <Typography fontWeight="medium">{u.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{u.bio || u.email}</Typography>
                  </Box>
                  <Chip 
                    label="Connect" 
                    variant="outlined" 
                    color="primary"
                    clickable
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light
                      }
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </Box>

          {/* Right Side - Search + Posts */}
          <Box sx={{ width: '70%' }}>
            <Paper 
              component="form" 
              onSubmit={handleSearch} 
              sx={{ 
                mb: 3, 
                p: 2,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              <TextField
                fullWidth
                placeholder="Search posts..."
                value={postSearchTerm}
                onChange={(e) => setPostSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 3,
                  }
                }}
              />
            </Paper>

            <PostList key={`${refresh}-${postSearchTerm}`} searchTerm={postSearchTerm} />
          </Box>
        </Box>
      )}
    </Container>
  );
}