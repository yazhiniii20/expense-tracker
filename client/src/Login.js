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
      localStorage.setItem('username', res.data.username);
      onLogin(res.data.username);
      alert('Login successful! Welcome ' + res.data.username);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        alignItems: 'stretch', // makes full width
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Login</h2>
      <input
        className="auth-input"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="auth-input"
        name="password"
        type="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <button
        className="auth-btn"
        type="submit"
        style={{ marginTop: '0.3rem' }}
      >
        Login
      </button>
      {message && (
        <div className="auth-message error-message">{message}</div>
      )}
    </form>
  );
}
