const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY || "linaoa";


// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Finding the usr by email
        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',[email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const userData = user.rows[0];

        // password checking
        if (userData.password != password) {
            return res.status(400).json({ message: 'wrong password' });
        }

        const token = jwt.sign(
            {id:userData.id, role: userData},
            SECRET_KEY,
            {expiresIn:'1h'}
        )

        // this is so that password is not in the repomse
        const { password: _, ...userWithoutPassword } = userData;
        
        res.json({ 
            success: true, 
            user: userWithoutPassword,
            message: 'Successfully logged in',
            token, 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
});

module.exports = router;