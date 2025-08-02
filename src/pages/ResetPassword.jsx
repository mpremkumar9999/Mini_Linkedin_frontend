import React, { useState } from 'react';
import API from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const loc = useLocation();
  const navigate = useNavigate();
  const email = loc.state?.email;
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!email) navigate('/forgot-password');

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/reset-password', { email, otp, newPassword });
      setMessage(res.data.message);
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form className="auth-form" onSubmit={submit}>
        <input type="number" placeholder="OTP" value={otp}
          onChange={e => setOtp(e.target.value)} required />
        <input type="password" placeholder="New Password" value={newPassword}
          onChange={e => setNewPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
