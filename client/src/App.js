import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import Budget from './Budget';
import Login from './Login';   // as before
import Register from './Register'; // as before
import './AuthForm.css';

function Navbar() {
  return (
    <nav style={{
      background: 'var(--steel-teal)',
      padding: '13px 0', marginBottom: '24px', textAlign: 'center'
    }}>
      <Link to="/" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/expenses" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Expenses</Link>
      <Link to="/add" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Add Expense</Link>
      <Link to="/budget" style={{ color: '#fff', margin: '0 22px', fontWeight: 500, textDecoration: 'none' }}>Budget</Link>
    </nav>
  );
}

export default function App() {
  // Use your auth logic as before; render Dashboard etc if authenticated

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/add" element={<ExpenseForm />} />
        <Route path="/budget" element={<Budget />} />
        {/* ...other auth routes */}
      </Routes>
    </BrowserRouter>
  );
}
