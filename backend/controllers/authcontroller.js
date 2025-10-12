const pool = require('../db');

async function loginUser(req,res) {
    const{email,password} = req.body;
    try{
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2',[email,password]);
        if (result.rows.length === 0){
            return res.status(404).json({message: 'Not found'});
        }

        const user = result.rows[0];
        res.json({
            message:'Successful Login',
            role:user.role,
            userId:user.id
        });
    }catch(err){
        console.error(err.message);
        res.status(500).json({message:'server error'});
    }
}

module.exports = {loginUser};