import React, { useState } from 'react';
import API from '../../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyOtp() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const email = loc.state?.email;
  if (!email) navigate('/register');

  const handleVerify = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/verify-otp', { email, otp });
      setMessage(res.data.message);
      navigate('/login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>
      {message && <p>{message}</p>}
      <form className="auth-form" onSubmit={handleVerify}>
        <input type="number" placeholder="Enter OTP" value={otp}
          onChange={e => setOtp(e.target.value)} required />
        <button type="submit">Verify & Complete Registration</button>
      </form>
    </div>
  );
}
