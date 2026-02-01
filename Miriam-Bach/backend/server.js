const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Guest = require('./models/Guest');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://vhuang_db_user:aoekIBX9NNyVaxRY@cluster0.dgynfuf.mongodb.net/miriam_bach?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/rsvp', async (req, res) => {
    try {
        const { name, email, status } = req.body;

        if (!name || !email || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newGuest = new Guest({ name, email, status });
        await newGuest.save();

        res.status(201).json({ message: 'RSVP submitted successfully!', guest: newGuest });
    } catch (error) {
        console.error('RSVP Error:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

app.get('/api/health', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
