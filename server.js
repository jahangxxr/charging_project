require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Handle database connection errors
app.get('/api/checkDB', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
    } else {
      res.send('Database connection is OK');
    }
  });
});

// Error handling in db.query callbacks
app.post('/api/addUser', async (req, res) => {
  const { fingerprint_id, name, email } = req.body;
  try {
    db.query('INSERT INTO users (fingerprint_id, name, email) VALUES (?, ?, ?)', [fingerprint_id, name, email], (err, results) => {
      if (err) {
        console.error('Error adding user:', err);
        return res.status(500).send('Error adding user');
      }
      res.send('User added!');
    });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Using async/await for cleaner error handling
app.post('/api/addLocker', async (req, res) => {
  const { locker_number } = req.body;
  try {
    await db.query('INSERT INTO lockers (locker_number, status) VALUES (?, "available")', [locker_number]);
    res.send('Locker added!');
  } catch (err) {
    console.error('Error adding locker:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/updateBilling', async (req, res) => {
  const { user_id, locker_id, voltage, current, power } = req.body;
  try {
    await db.query('INSERT INTO billing (user_id, locker_id, voltage, current, power) VALUES (?, ?, ?, ?, ?)', [user_id, locker_id, voltage, current, power]);
    res.send('Billing data inserted!');
  } catch (err) {
    console.error('Error updating billing:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Define route handler for GET request to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
