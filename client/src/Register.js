import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
      setSuccess(true);
      alert(res.data.message);
      setTimeout(() => {
        setMessage('');
        onRegister();
      }, 1600);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error registering');
      setSuccess(false);
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
        alignItems: 'stretch',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Register</h2>
      <input
        className="auth-input"
        name="username"
        placeholder="Username"
        required
        value={formData.username}
        onChange={handleChange}
      />
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
        Register
      </button>
      {message && (
        <div className={`auth-message ${success ? 'success-message' : 'error-message'}`}>{message}</div>
      )}
    </form>
  );
}
