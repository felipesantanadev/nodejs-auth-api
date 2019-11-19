const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// Middlewares
app.use(express.json());

// Connect to database
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, 
                                                   useUnifiedTopology: true }, (err) => {
    if(err){
        console.error(err);
    } else {
        console.log('Connected to DB.');
    }
});

// Import routes
const authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/users', authRoute);


app.listen(5000, () => console.log('Server up and running...'));