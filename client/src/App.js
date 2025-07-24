import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './AuthForm.css';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <h2>Welcome, {user}!</h2>
          <button className="auth-btn" onClick={() => {
            setUser(null);
            localStorage.removeItem('token');
          }}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {page === 'login' ? (
          <>
            <Login onLogin={setUser} />
            <p style={{ textAlign: 'center' }}>
              Don&apos;t have an account?
              <button className="auth-link-btn" type="button" onClick={() => setPage('register')}>Register</button>
            </p>
          </>
        ) : (
          <>
            <Register onRegister={() => setPage('login')} />
            <p style={{ textAlign: 'center' }}>
              Already have an account?
              <button className="auth-link-btn" type="button" onClick={() => setPage('login')}>Login</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
