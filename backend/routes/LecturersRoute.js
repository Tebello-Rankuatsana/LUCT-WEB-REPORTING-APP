const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all lecturers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE role = $1 ORDER BY name',
      ['lecturer']
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    res.status(500).json({ error: 'Failed to fetch lecturers' });
  }
});

module.exports = router;