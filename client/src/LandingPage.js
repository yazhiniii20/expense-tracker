import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Track Your Expenses, Master Your Budget</h1>
        <p style={styles.subtitle}>
          Keep your finances under control with ease. Monitor your spending, set budgets, and save more.
        </p>
        <div style={styles.features}>
          <Feature icon="💰" text="Secure User Authentication" />
          <Feature icon="📊" text="Interactive Charts & Insights" />
          <Feature icon="🗂️" text="Organize Expenses by Category" />
          <Feature icon="📅" text="Track Monthly Budgets & Spending" />
        </div>
        <div style={styles.buttonContainer}>
          <Link to="/login" style={{ ...styles.button, ...styles.loginButton }}>
            Login
          </Link>
          <Link to="/register" style={{ ...styles.button, ...styles.registerButton }}>
            Register
          </Link>
        </div>
      </div>
      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} Expense Tracker. Manage your money smartly.
      </footer>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div style={styles.featureItem}>
      <span style={styles.featureIcon} aria-hidden="true">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--light-blue)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: 'var(--midnight-blue)',
  },
  card: {
    background: 'var(--blue-gray)',
    padding: 40,
    borderRadius: 20,
    boxShadow: '0 12px 40px rgba(11,46,51,0.15)',
    maxWidth: 600,
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.7rem',
    fontWeight: 700,
    margin: '0 0 18px 0',
    color: 'var(--steel-teal)',
    letterSpacing: '0.05em',
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: 30,
    color: 'var(--midnight-blue)',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    rowGap: 20,
    columnGap: 30,
    marginBottom: 40,
  },
  featureItem: {
    background: 'var(--light-blue)',
    padding: '14px 18px',
    borderRadius: 12,
    fontWeight: 600,
    boxShadow: '0 3px 8px rgba(11,46,51,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: '1.05rem',
    color: 'var(--steel-teal)',
    transition: 'background 0.3s, color 0.3s',
    cursor: 'default',
  },
  featureIcon: {
    fontSize: '1.6rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '22px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '14px 48px',
    fontSize: '1.15rem',
    fontWeight: 700,
    borderRadius: 12,
    textDecoration: 'none',
    color: '#fff',
    boxShadow: '0 6px 18px rgba(79,124,130,0.4)',
    transition: 'all 0.3s ease',
  },
  loginButton: {
    backgroundColor: 'var(--steel-teal)',
    border: '2px solid var(--steel-teal)',
  },
  registerButton: {
    backgroundColor: 'transparent',
    border: '2px solid var(--steel-teal)',
    color: 'var(--steel-teal)',
    boxShadow: 'none',
  },
  footer: {
    marginTop: 40,
    fontSize: '0.9rem',
    color: 'var(--blue-gray)',
  },
};
