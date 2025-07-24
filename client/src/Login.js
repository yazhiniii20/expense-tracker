import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.username);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} autoComplete="off">
      <h2>Login</h2>
      <input className="auth-input" name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
      <input className="auth-input" name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
      <button className="auth-btn" type="submit">Login</button>
      {message && (
        <div className="auth-message error-message">{message}</div>
      )}
    </form>
  );
}
