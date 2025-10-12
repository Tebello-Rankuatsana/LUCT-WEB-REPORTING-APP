const express = require('express');
const router = express.Router();
const pool = require('../db');

// submitting a new report
router.post('/', async (req, res) => {
  try {
    const {
      class_id,
      week,
      date,
      student_present,
      topic,
      outcomes,
      recommendations
    } = req.body;

    const insertQuery = `
      INSERT INTO reports (
        class_id, 
        week, 
        date, 
        student_present, 
        topic, 
        outcomes, 
        recommendations
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      class_id,
      week,
      date,
      student_present,
      topic,
      outcomes,
      recommendations
    ];

    const result = await pool.query(insertQuery, values);
    
    res.status(201).json({
      message: 'Report submitted successfully',
      report: result.rows[0]
    });

  } catch (error) {
    console.error('Error submitting report:', error);
    res.status(500).json({ 
      message: 'Server error while submitting report'
    });
  }

    router.get('/', async (req, res) => {
    try {
        const query = `
        SELECT * FROM reports 
        ORDER BY date DESC
        `;
        
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Server error while fetching reports' });
    }
    });
});

module.exports = router;