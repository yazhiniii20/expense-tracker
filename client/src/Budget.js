import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AuthForm.css';

export default function Budget() {
  const [budget, setBudget] = useState('');
  const [input, setInput] = useState('');
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      // Fetch user's budget
      try {
        const bRes = await axios.get('http://localhost:5000/api/budget', { headers: { Authorization: `Bearer ${token}` } });
        setBudget(bRes.data?.budget || 0);
        setInput(bRes.data?.budget?.toString() || '');
      } catch {}
      // Fetch total expenses
      try {
        const eRes = await axios.get('http://localhost:5000/api/expenses', { headers: { Authorization: `Bearer ${token}` } });
        setSpent(eRes.data.reduce((sum, exp) => sum + exp.amount, 0));
      } catch {}
    }
    fetchData();
  }, []);

  async function handleSaveBudget(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/budget', { budget: Number(input) }, { headers: { Authorization: `Bearer ${token}` } });
      setBudget(input);
    } catch {}
  }

  return (
    <div className="page-container">
      <div className="card">
        <h2>Monthly Budget</h2>
        <form onSubmit={handleSaveBudget} style={{ marginBottom: 25 }}>
          <input
            className="input"
            type="number"
            value={input}
            placeholder="Set monthly budget"
            onChange={e => setInput(e.target.value)}
            min={0}
          />
          <button className="btn" type="submit">Save Budget</button>
        </form>
        <p>Spent: <b>₹{spent}</b> / Budget: <b>₹{budget}</b></p>
        <div className="progress-bar-bg" style={{ width: 320, maxWidth: "97%" }}>
          <div
            className="progress-bar-fill"
            style={{
              width: budget > 0 ? `${Math.min((spent / budget) * 100, 100)}%` : "0%"
            }}
          ></div>
        </div>
        {budget > 0 && spent > budget && <p style={{ color: '#bb2222', fontWeight: 600 }}>Budget exceeded!</p>}
      </div>
    </div>
  );
}
