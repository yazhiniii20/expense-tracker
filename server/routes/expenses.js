const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// GET /api/expenses
// Returns all expenses for authenticated user (sorted desc by date)
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    console.error('Fetch expenses error:', err);
    res.status(500).json({ message: 'Server error fetching expenses' });
  }
});

// POST /api/expenses
// Add a new expense for the authenticated user
router.post('/', auth, async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    if (amount == null || isNaN(Number(amount))) {
      return res.status(400).json({ message: 'Amount is required and must be a number' });
    }

    const expense = new Expense({
      user: req.userId,
      amount: Number(amount),
      category: category || 'Other',
      description: description || '',
      date: date ? new Date(date) : new Date()
    });

    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Add expense error:', err);
    res.status(500).json({ message: 'Server error adding expense' });
  }
});

// PUT /api/expenses/:id
// Update an existing expense (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });

    const { amount, category, description, date } = req.body;
    if (amount != null) expense.amount = Number(amount);
    if (category != null) expense.category = category;
    if (description != null) expense.description = description;
    if (date != null) expense.date = new Date(date);

    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error('Update expense error:', err);
    res.status(500).json({ message: 'Server error updating expense' });
  }
});

// DELETE /api/expenses/:id
// Delete an expense (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });

    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    console.error('Delete expense error:', err);
    res.status(500).json({ message: 'Server error deleting expense' });
  }
});

module.exports = router;
