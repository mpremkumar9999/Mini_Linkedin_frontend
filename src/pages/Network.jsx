import React, { useEffect, useState, useContext } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Divider, 
  Button,
  IconButton,
  Chip,
  useTheme
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { ArrowBack, ConnectWithoutContact } from '@mui/icons-material';
import { styled } from '@mui/system';

const UserCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.action.hover
  }
}));

export default function Network() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    API.get('/users')
      .then(res => {
        const all = res.data
          .filter(u => u._id !== user?._id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest users first
        setUsers(all);
      })
      .catch(console.error);
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 2, color: theme.palette.primary.main }}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          <ConnectWithoutContact sx={{ 
            verticalAlign: 'middle', 
            mr: 1,
            color: theme.palette.primary.main 
          }} />
          Network Connections
        </Typography>
      </Box>

      <Paper sx={{ 
        p: 3,
        borderRadius: 4,
        boxShadow: theme.shadows[2],
        maxHeight: '70vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main,
          borderRadius: '3px'
        }
      }}>
        {users.length === 0 ? (
          <Typography 
            variant="body1" 
            color="text.secondary" 
            textAlign="center"
            sx={{ py: 4 }}
          >
            No other users found in your network.
          </Typography>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" color="text.secondary">
                Showing {users.length} connections
              </Typography>
              <Chip 
                label="Newest First" 
                size="small" 
                color="primary" 
                variant="outlined"
              />
            </Box>
            <Divider sx={{ mb: 3 }} />

            {users.map(u => (
              <UserCard
                key={u._id}
                elevation={0}
                onClick={() => navigate(`/profile/${u._id}`)}
              >
                <Avatar 
                  src={u.avatar}
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    mr: 2,
                    fontSize: '1.5rem',
                    bgcolor: theme.palette.secondary.main
                  }}
                >
                  {u.name?.charAt(0)?.toUpperCase() || '?'}
                </Avatar>
                <Box flexGrow={1}>
                  <Typography variant="h6" fontWeight="bold">
                    {u.name || 'Unnamed User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {u.jobTitle || 'No title specified'}
                  </Typography>
                  {u.bio && (
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      "{u.bio}"
                    </Typography>
                  )}
                </Box>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add connection logic here
                  }}
                >
                  Connect
                </Button>
              </UserCard>
            ))}
          </>
        )}
      </Paper>
    </Container>
  );
}