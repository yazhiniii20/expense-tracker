import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AuthForm.css';

export default function Dashboard({ username }) {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExpenses(res.data);
        setTotal(res.data.reduce((sum, exp) => sum + exp.amount, 0));

        // group by category
        const grouped = res.data.reduce((acc, exp) => {
          acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
          return acc;
        }, {});

        const formatted = Object.keys(grouped).map(cat => ({
          name: cat,
          value: grouped[cat]
        }));
        setCategoryData(formatted);

      } catch (e) {
        setExpenses([]);
        setTotal(0);
        setCategoryData([]);
      }
    }
    fetchExpenses();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1'];

  return (
    <div className="page-container">
      <div className="card">
        <h1>{username && <p style={{ fontWeight: 600, marginBottom: 20 }}>Welcome, <b>{username}</b>!</p>}</h1>
        <h2>Dashboard</h2>

        {/* Total Spent */}
        <div style={{
          background: "#fff",
          padding: "18px 20px",
          borderRadius: 15,
          marginBottom: 25,
          boxShadow: "0 1px 7px rgba(0,0,0,0.03)"
        }}>
          <h3 style={{ margin: 0 }}>Total Spent This Month</h3>
          <p style={{ fontSize: 26, fontWeight: 600, color: 'var(--steel-teal)', margin: "14px 0 0 0" }}>
            ₹{total}
          </p>
        </div>

        {/* Spending by Category Chart */}
        <div style={{ background: "#fff", borderRadius: 13, padding: 18, margin: "0 0 28px 0" }}>
          <h3 style={{ margin: "0 0 16px 0" }}>Spending by Category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", color: "#666" }}>No data to display</p>
          )}
        </div>

        {/* Recent Expenses */}
        <h3>Recent Expenses</h3>
        {expenses.length === 0 && <p>No expenses yet.</p>}
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {expenses.slice(0, 5).map(exp => (
            <li key={exp._id} style={{
              background: "#fff", color: '#0B2E33',
              marginBottom: 10, borderRadius: 8, padding: "8px 14px"
            }}>
              {exp.date?.split('T')[0] || ''} - <b>{exp.category}</b>: ₹{exp.amount}
              {exp.description && <> ({exp.description})</>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
