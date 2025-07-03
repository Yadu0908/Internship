require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
const port = 3000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) throw new Error('⚠️  Add MONGODB_URI to .env');

mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅  DB connected');
    app.listen(port, () => console.log(`🚀  Server running: http://localhost:${port}`));
  })
  .catch(err => console.error('DB connection error:', err.message));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

// Show registration page
app.get('/views/register', (_, res) => res.render('register'));

// Handle registration
app.post('/register', async (req, res) => {
  try {
    const { username, password, date, email, phone, ticketType } = req.body;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      username,
      password: passwordHash,
      date,
      email,
      phone,
      ticketType
    });

    res.send(`<h2>Welcome, ${newUser.username}! 🎉</h2>`);
  } catch (err) {
    if (err.code === 11000) {
      res.send(`<h2>Username or email already exists. 🛑</h2>`);
    } else {
      res.send(`<h2>Error: ${err.message}</h2>`);
    }
  }
});

// Show login page
app.get('/views/login', (req, res) => {
  res.render('login');
});

// Handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.send('User not found 🫤 <a href="/views/login">Try again</a>');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send('Wrong password 😵 <a href="/views/login">Try again</a>');
    }

    // Successful login
    res.render('user', { user });
  } catch (err) {
    res.send(`Login Error: ${err.message}`);
  }
});

// Admin view: show all users
app.get('/views/admin', async (req, res) => {
  const users = await User.find();
  res.render('admin', { users });
});
