// URL -> http://localhost:5000
const express = require('express');
const cors = require('cors');
const pool = require('./db');// database connection
const app = express();
const loginRoute = require('./routes/loginRoute.js');
const reportsRoutes = require('./routes/ReportsRoute.js');

// middleware - authenticating a user
// middleware(just before we hit the endpoints)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
// middleware to parse JSON body
app.use(express.json());//this gives us access to request.body

app.use('/api',loginRoute);

app.use('/api/reports', reportsRoutes);

app.get('/api/test',(req,res)=>{
    res.json({message: 'backend is working'})
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server has started on PORT: ${PORT}`));//a callback function that indicates that the server has started