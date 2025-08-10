const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const auth = require('../middleware/auth');

// GET /api/budget
router.get('/', auth, async (req, res) => {
  try {
    const data = await Budget.findOne({ user: req.userId });
    res.json({ budget: data ? data.budget : 0 });
  } catch (err) {
    console.error('Get budget error:', err);
    res.status(500).json({ message: 'Server error fetching budget' });
  }
});

// POST /api/budget
// Create or update budget for user
router.post('/', auth, async (req, res) => {
  try {
    const { budget } = req.body;
    if (budget == null || isNaN(Number(budget))) return res.status(400).json({ message: 'Budget must be a number' });

    const value = Number(budget);

    const updated = await Budget.findOneAndUpdate(
      { user: req.userId },
      { budget: value, updatedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ budget: updated.budget });
  } catch (err) {
    console.error('Save budget error:', err);
    res.status(500).json({ message: 'Server error saving budget' });
  }
});

module.exports = router;
