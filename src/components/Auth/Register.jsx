import React, { useState } from 'react';
import API from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
  name: '',
  email: '',
  username: '', // ✅ added
  password: '',
  bio: ''
});

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');

  console.log('Sending data:', form);  // 🟡 ADD THIS LINE

  try {
    const res = await API.post('/auth/register', form);
    setMessage(res.data.message);
    navigate('/verify-otp', { state: { email: form.email } });
  } catch (err) {
    console.log(err.response?.data);   // 🟡 ADD THIS TOO
    setMessage(err.response?.data?.message || 'Something went wrong');
  }
};

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          required
        />
        <button type="submit">Register & Send OTP</button>
      </form>
    </div>
  );
}
