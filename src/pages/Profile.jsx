import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material'; // Import the back icon
import { IconButton } from '@mui/material';

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/users/${id}`)
      .then(res => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={styles.loadingContainer}>
      <div style={styles.spinner}></div>
      <p style={styles.loadingText}>Loading profile...</p>
    </div>
  );

  if (!userData) return <p style={styles.error}>Profile not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          {/* Go Back Button */}
          <div style={styles.headerActions}>
            <IconButton 
              onClick={() => navigate(-1)} 
              style={styles.backButton}
              aria-label="go back"
            >
              <ArrowBack style={{ color: 'white' }} />
            </IconButton>
          </div>
          
          <div style={styles.avatarPlaceholder}>
            {userData.user.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={styles.name}>{userData.user.name}</h2>
          <p style={styles.email}>{userData.user.email}</p>
          {userData.user.bio && (
            <p style={styles.bio}>"{userData.user.bio}"</p>
          )}
        </div>

        <div style={styles.postsContainer}>
          <h3 style={styles.postsTitle}>Posts</h3>
          {userData.posts.length > 0 ? (
            userData.posts.map(post => (
              <div style={styles.postCard} key={post._id}>
                <small style={styles.postDate}>
                  {new Date(post.createdAt).toLocaleString()}
                </small>
                <p style={styles.postContent}>{post.content}</p>
              </div>
            ))
          ) : (
            <p style={styles.noPosts}>No posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  spinner: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    borderLeftColor: '#1976d2',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  loadingText: {
    color: '#555',
    fontSize: '18px',
  },
  error: {
    textAlign: 'center',
    color: '#d32f2f',
    marginTop: '40px',
    fontSize: '18px',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    position: 'relative',
  },
  profileHeader: {
    padding: '32px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
    color: 'white',
  },
  headerActions: {
    position: 'absolute',
    top: '16px',
    left: '16px',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  avatarPlaceholder: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 auto 16px',
  },
  name: {
    fontSize: '28px',
    margin: '8px 0',
  },
  email: {
    opacity: 0.9,
    margin: '4px 0 12px',
  },
  bio: {
    fontStyle: 'italic',
    marginTop: '12px',
    opacity: 0.9,
  },
  postsContainer: {
    padding: '24px',
  },
  postsTitle: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  postCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },
  postDate: {
    color: '#666',
    display: 'block',
    marginBottom: '8px',
  },
  postContent: {
    margin: 0,
    lineHeight: 1.5,
    color: '#333',
  },
  noPosts: {
    textAlign: 'center',
    color: '#666',
    padding: '20px',
  },
};