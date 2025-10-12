require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});

async function dbtesting() {
    try{     
        const res = await pool.query('SELECT * FROM reports');
        console.log(res.rows)
        console.log('Server time:',res.rows[0]);
        console.log('connection established');
    }catch(err){
        console.log('fahhhhh',err.stack);
    }finally{
        await pool.end();
    }
}
dbtesting();