const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// POST new rating
router.post('/', async (req, res) => {
  const { lecturer_id, rating } = req.body;
  
  // In a real app, you'd get student_id from auth middleware
  const student_id = req.user?.id || 1; // Default for demo

  if (!lecturer_id || !rating) {
    return res.status(400).json({ error: 'Lecturer ID and rating are required' });
  }

  if (rating < 1 || rating > 10) {
    return res.status(400).json({ error: 'Rating must be between 1 and 10' });
  }

  try {
    // Check if lecturer exists
    const lecturerCheck = await pool.query(
      'SELECT id FROM users WHERE id = $1 AND role = $2',
      [lecturer_id, 'lecturer']
    );

    if (lecturerCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Lecturer not found' });
    }

    // Insert rating (using your existing ratings table structure)
    const query = `
      INSERT INTO ratings (lecturer_id, student_id, rating, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;
    
    const values = [lecturer_id, student_id, rating];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Rating submitted successfully',
      rating: result.rows[0]
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
});

// GET ratings history for student (optional)
router.get('/my-ratings', async (req, res) => {
  const student_id = req.user?.id || 1; // Default for demo
  
  try {
    const query = `
      SELECT r.id, r.rating, r.created_at, u.name as lecturer_name
      FROM ratings r
      JOIN users u ON r.lecturer_id = u.id
      WHERE r.student_id = $1
      ORDER BY r.created_at DESC
    `;
    
    const result = await pool.query(query, [student_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
});

module.exports = router;