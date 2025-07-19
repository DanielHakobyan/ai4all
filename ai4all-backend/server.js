// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const mediaRoutes =  require('./routes/media.js');

dotenv.config();
const app = express();

// Improved CORS setup
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes); // Removed because authRoutes is not defined
app.use('/api/media', mediaRoutes);

// MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch((err) => console.error('MongoDB connection error:', err));
