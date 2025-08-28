import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP & new password
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // hook to navigate programmatically

  // Step 1: Send OTP
  const handleSendOTP = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending OTP');
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
      setMessage(res.data.message);

      // Clear form
      setStep(1);
      setEmail('');
      setOTP('');
      setNewPassword('');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Forgot Password</h2>

      {message && <div style={{ marginBottom: 12, color: 'red', textAlign: 'center' }}>{message}</div>}

      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          />
          <button type="submit" style={{ width: '100%', padding: 10 }}>Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            required
            onChange={e => setOTP(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            required
            onChange={e => setNewPassword(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 12 }}
          />
          <button type="submit" style={{ width: '100%', padding: 10 }}>Reset Password</button>
        </form>
      )}
    </div>
  );
}
