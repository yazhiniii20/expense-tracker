import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import Budget from './Budget';
import Login from './Login';
import Register from './Register';
import './AuthForm.css';

// Simple component to wrap private routes
function PrivateRoute({ children, isAuth }) {
  return isAuth ? children : <Navigate to="/login" />;
}

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
      <Link
        to="/"
        style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}
      >
        Dashboard
      </Link>
      <Link
        to="/expenses"
        style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}
      >
        Expenses
      </Link>
      <Link
        to="/add"
        style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}
      >
        Add Expense
      </Link>
      <Link
        to="/budget"
        style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}
      >
        Budget
      </Link>
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

// AuthPage to toggle Login and Register forms
function AuthPage({ isLogin, onLoginSuccess, onSwitch }) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? <Login onLogin={onLoginSuccess} /> : <Register onRegister={onSwitch} />}
        <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--midnight-blue)' }}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button className="auth-link-btn" onClick={onSwitch}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // On mount check localStorage for token and username
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser(username);
    }
  }, []);

  function handleLogin(username) {
    setUser(username);
    localStorage.setItem('username', username);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    setShowLogin(true); // Show login form by default after logout
  }

  function toggleAuthForm() {
    setShowLogin((prev) => !prev);
  }

  if (!user) {
    // Not logged in: show Login/Register toggle page
    return (
      <AuthPage isLogin={showLogin} onLoginSuccess={handleLogin} onSwitch={toggleAuthForm} />
    );
  }

  // Logged in: show main app with protected routes
  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PrivateRoute isAuth={!!user}><Dashboard username={user} /></PrivateRoute>} />
        <Route path="/expenses" element={<PrivateRoute isAuth={!!user}><ExpenseList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute isAuth={!!user}><ExpenseForm /></PrivateRoute>} />
        <Route path="/budget" element={<PrivateRoute isAuth={!!user}><Budget /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
