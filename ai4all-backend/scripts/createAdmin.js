const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/YOUR_DB_NAME');

async function createAdmin() {
  const email = 'ai4all@example.com'; // CHANGE THIS
  const password = 'adminpass';   // CHANGE THIS
  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash, isAdmin: true });
  console.log('Admin user created');
  process.exit();
}

createAdmin(); 