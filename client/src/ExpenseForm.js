import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';

export default function ExpenseForm({ onSave }) {
  const [form, setForm] = useState({
    amount: '', category: '', date: '', description: ''
  });
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/expenses', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Expense added!");
      setForm({ amount: '', category: '', date: '', description: '' });
      if (onSave) onSave();
    } catch (err) {
      setMessage('Error adding expense');
    }
  }

  return (
    <div className="page-container">
      <form className="card" onSubmit={handleSubmit} autoComplete="off">
        <h2>Add New Expense</h2>
        <input className="input" name="amount" type="number" placeholder="Amount" required value={form.amount} onChange={handleChange} />
        <select className="select" name="category" required value={form.category} onChange={handleChange}>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <input className="input" name="date" type="date" required value={form.date} onChange={handleChange} />
        <input className="input" name="description" placeholder="Description" required value={form.description} onChange={handleChange} />
        <button className="btn" type="submit">Add Expense</button>
        {message && <div className="auth-message">{message}</div>}
      </form>
    </div>
  );
}
