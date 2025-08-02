// src/components/Feed/PostList.jsx
import React, { useEffect, useState, useContext } from 'react';
import API from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Paper, Typography, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PostList({ searchTerm = '' }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get('/posts')
      .then(res => {
        const filtered = res.data.filter(p =>
          searchTerm
            ? p.content.toLowerCase().includes(searchTerm.toLowerCase())
            : true
        );
        setPosts(filtered.reverse());
        setPosts(filtered.reverse()); // Newest first
      })
      .catch(console.error);
  }, [searchTerm]);

  const handleDelete = id => {
    if (window.confirm('Delete this post?')) {
      API.delete(`/posts/${id}`)
        .then(() => setPosts(prev => prev.filter(p => p._id !== id)));
    }
  };

  const handleEdit = (id, oldContent) => {
    const updated = prompt('Edit your post', oldContent);
    if (updated && updated !== oldContent) {
      API.put(`/posts/${id}`, { content: updated })
        .then(() => setPosts(prev =>
          prev.map(p => p._id === id ? { ...p, content: updated } : p)
        ));
    }
  };

  return (
    <div>
      {posts.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No posts found.
        </Typography>
      ) : (
        posts.map(p => (
          <Paper
            key={p._id}
            elevation={2}
            sx={{ mb: 3, p: 2, borderRadius: 2 }}
          >
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography
                component={Link}
                to={`/profile/${p.userId._id}`}
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                  fontWeight: 'bold'
                }}
              >
                {p.userId.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(p.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {p.content}
            </Typography>
            {user && user._id === p.userId._id && (
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(p._id, p.content)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(p._id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Paper>
        ))
      )}
    </div>
  );
}
