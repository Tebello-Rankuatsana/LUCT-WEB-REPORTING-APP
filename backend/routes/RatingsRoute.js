const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  try {
    const { class_id, rating } = req.body;

    const query = `
      INSERT INTO ratings (class_id, rating, created_at) 
      VALUES ($1, $2, NOW()) 
      RETURNING *
    `;

    const values = [class_id, rating];
    const result = await pool.query(query, values);
    
    res.status(201).json({
      message: 'Rating submitted successfully',
      rating: result.rows[0]
    });

  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Server error while submitting rating' });
  }
});

module.exports = router;