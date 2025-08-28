import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import Budget from './Budget';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import './AuthForm.css';

// Simple component to wrap private routes
function PrivateRoute({ children, isAuth }) {
  return isAuth ? children : <Navigate to="/login" />;
}

// Navbar component
function Navbar({ onLogout }) {
  return (
    <nav
      style={{
        background: 'var(--steel-teal)',
        padding: '13px 0',
        marginBottom: '24px',
        textAlign: 'center',
      }}
    >
      <Link to="/" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/expenses" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Expenses</Link>
      <Link to="/add" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Add Expense</Link>
      <Link to="/budget" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Budget</Link>
      <button
        onClick={onLogout}
        style={{
          marginLeft: '20px',
          padding: '7px 14px',
          borderRadius: 6,
          fontWeight: 600,
          background: 'var(--midnight-blue)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </nav>
  );
}

// AuthPage to toggle Login/Register forms
function AuthPage({ isLogin, onLoginSuccess }) {
  const [showLogin, setShowLogin] = useState(isLogin);

  const toggleForm = () => setShowLogin(prev => !prev);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {showLogin ? (
          <Login onLogin={onLoginSuccess} />
        ) : (
          <Register onRegister={toggleForm} />
        )}
        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--midnight-blue)' }}>
          {showLogin ? "Don't have an account?" : 'Already have an account?'}
          <button className="auth-link-btn" onClick={toggleForm}>
            {showLogin ? 'Register' : 'Login'}
          </button>
        </p>
        {showLogin && (
          <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <Link to="/forgot-password" style={{ color: 'var(--midnight-blue)', textDecoration: 'underline' }}>
              Forgot Password?
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  // On mount, check localStorage for token and username
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) setUser(username);
  }, []);

  // Handle login
  function handleLogin(username) {
    setUser(username);
    localStorage.setItem('username', username);
  }

  // Handle logout
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  }

  return (
    <BrowserRouter>
      {user && <Navbar onLogout={handleLogout} />}
      <Routes>
        {!user && (
          <>
            <Route path="/login" element={<AuthPage isLogin={true} onLoginSuccess={handleLogin} />} />
            <Route path="/register" element={<AuthPage isLogin={false} onLoginSuccess={handleLogin} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute isAuth={!!user}><Dashboard username={user} /></PrivateRoute>} />
        <Route path="/expenses" element={<PrivateRoute isAuth={!!user}><ExpenseList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute isAuth={!!user}><ExpenseForm /></PrivateRoute>} />
        <Route path="/budget" element={<PrivateRoute isAuth={!!user}><Budget /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
