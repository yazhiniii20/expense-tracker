import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AuthForm.css';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({ category: '', search: '' });

  useEffect(() => { fetchExpenses(); }, []);

  async function fetchExpenses() {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(res.data);
    } catch (err) { setExpenses([]); }
  }

  function filteredExpenses() {
    return expenses.filter(exp =>
      (!filter.category || exp.category === filter.category) &&
      (!filter.search || exp.description?.toLowerCase().includes(filter.search.toLowerCase()))
    );
  }

  // For actual projects, also add edit/delete logic here
  return (
    <div className="page-container">
      <div className="card">
        <h2>All Expenses</h2>
        <div style={{ marginBottom: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <select className="select" value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })} style={{ minWidth: 140 }}>
            <option value="">All Categories</option>
            <option value="Food">Food</option><option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option><option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option><option value="Other">Other</option>
          </select>
          <input className="input" placeholder="Search description"
                 value={filter.search}
                 onChange={e => setFilter({ ...filter, search: e.target.value })} />
        </div>

        <table className="table">
          <thead><tr>
            <th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Action</th>
          </tr></thead>
          <tbody>
            {filteredExpenses().map(exp => (
              <tr key={exp._id}>
                <td>{exp.date ? exp.date.substr(0,10) : ''}</td>
                <td>{exp.category}</td>
                <td>{exp.description}</td>
                <td>₹{exp.amount}</td>
                <td>
                  {/* For now do not implement edit/delete, just show buttons */}
                  <button className="action-btn">Edit</button>
                  <button className="action-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredExpenses().length === 0 && <p style={{ marginTop: 16, textAlign: 'center' }}>No matching expenses.</p>}
      </div>
    </div>
  );
}
