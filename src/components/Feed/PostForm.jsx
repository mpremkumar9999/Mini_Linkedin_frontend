import React, { useState, useContext } from 'react';
import API from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { Paper, TextField, Button } from '@mui/material';

export default function PostForm({ onPost }) {
  const [content, setContent] = useState('');
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim()) return;
    await API.post('/posts', { content });
    setContent('');
    onPost();
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label={`What's on your mind, ${user.name}?`}
          multiline rows={4}
          fullWidth value={content}
          onChange={e => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>Post</Button>
      </form>
    </Paper>
  );
}
