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
  Badge,
  useTheme,
  styled
} from '@mui/material';
import { 
  Search, 
  ConnectWithoutContact, 
  RocketLaunch, 
  Logout, 
  Notifications,
  ArrowBack
} from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #2c3e50 0%, #1a1a2e 100%)'
    : 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
  color: theme.palette.common.white,
  padding: theme.spacing(8, 2),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  boxShadow: theme.shadows[10],
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '50%',
  }
}));

const UserCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.action.hover
  }
}));

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([]);
  const [postSearchTerm, setPostSearchTerm] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

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

  const goProfile = (id) => navigate(`/profile/${id}`);
  
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  if (!user) {
    return (
      <Container maxWidth="md">
        <HeroSection>
          <Typography variant="h3" gutterBottom sx={{ 
            fontWeight: 700,
            position: 'relative',
            zIndex: 1
          }}>
            Welcome to Mini-LinkedIn
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 4,
            position: 'relative',
            zIndex: 1,
            opacity: 0.9
          }}>
            Connect with professionals and grow your network
          </Typography>
          <Box position="relative" zIndex={1}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              startIcon={<RocketLaunch />}
              sx={{ 
                mr: 2,
                px: 4,
                boxShadow: theme.shadows[4],
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register" 
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'white',
                px: 4,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Register
            </Button>
          </Box>
        </HeroSection>

        <Box display="flex" justifyContent="center" mt={6}>
          <Button 
            variant="text" 
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ color: theme.palette.text.secondary }}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with Logout */}
     <Box display="flex" justifyContent="flex-end" mb={2}>
  <IconButton 
    onClick={handleLogout} 
    color="primary" 
    sx={{ mr: 1 }}
    title="Logout"
  >
    <Logout />
  </IconButton>
</Box>

      <Box display="flex" gap={4} flexDirection={{ xs: 'column', md: 'row' }}>
        {/* Sidebar */}
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          {/* User Profile Card */}
          <Paper sx={{ 
            mb: 3, 
            p: 3,
            borderRadius: 4,
            boxShadow: theme.shadows[3],
            background: theme.palette.background.paper
          }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar 
                src={user.avatar}
                sx={{ 
                  width: 56, 
                  height: 56, 
                  mr: 2,
                  fontSize: '1.5rem',
                  bgcolor: theme.palette.primary.main
                }}
              >
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <PostForm onPost={() => setRefresh(r => !r)} />
          </Paper>

          {/* Suggested Connections */}
          <Paper sx={{ 
            p: 3, 
            borderRadius: 4,
            boxShadow: theme.shadows[3],
            maxHeight: 400,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: '3px'
            }
          }}>
            <Box display="flex" alignItems="center" mb={2}>
              <ConnectWithoutContact color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Suggested Connections
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {users.length === 0 ? (
              <Typography variant="body2" color="text.secondary" textAlign="center">
                No other users found
              </Typography>
            ) : (
              users.slice(0, 5).map((u) => (
                <UserCard
                  key={u._id}
                  elevation={0}
                  onClick={() => goProfile(u._id)}
                >
                  <Avatar 
                    src={u.avatar} 
                    sx={{ 
                      mr: 2,
                      width: 40,
                      height: 40,
                      bgcolor: theme.palette.secondary.main
                    }}
                  >
                    {u?.name?.charAt(0)?.toUpperCase() || '?'}
                  </Avatar>
                  <Box flexGrow={1}>
                    <Typography fontWeight="bold">{u?.name || 'Unknown'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {u?.bio || u?.email || 'No bio'}
                    </Typography>
                  </Box>
                  <Chip 
                    label="Connect" 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add connection logic here
                    }}
                  />
                </UserCard>
              ))
            )}
            <Button
              component={Link}
              to="/network"
              fullWidth
              variant="outlined"
              sx={{ 
                mt: 2,
                borderRadius: 2,
                py: 1
              }}
            >
              View All Connections
            </Button>
          </Paper>
        </Box>

        {/* Main Feed */}
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          {/* Post Search */}
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{ 
              mb: 3, 
              p: 2,
              display: 'flex',
              borderRadius: 4,
              boxShadow: theme.shadows[3]
            }}
          >
            <TextField
              fullWidth
              placeholder="Search posts (e.g. internship, jobs)..."
              value={postSearchTerm}
              onChange={(e) => setPostSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent'
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent'
                  }
                }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                ml: 2,
                px: 3,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Search
            </Button>
          </Paper>

          {/* Post List */}
          <Paper sx={{ 
            p: 3, 
            borderRadius: 4,
            boxShadow: theme.shadows[3],
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: '3px'
            }
          }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight="bold">
                Recent Updates
              </Typography>
              {postSearchTerm && (
                <Chip
                  label={`Filter: ${postSearchTerm}`}
                  onDelete={() => setPostSearchTerm('')}
                  color="primary"
                  variant="outlined"
                  sx={{ ml: 2 }}
                />
              )}
            </Box>
            <Divider sx={{ mb: 3 }} />
            <PostList
              key={`${refresh}-${postSearchTerm}`}
              searchTerm={postSearchTerm}
            />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}