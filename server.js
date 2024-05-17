const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

const db = mysql.createPool({
  connectionLimit : 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Handle database connection errors
db.on('error', (err) => {
  console.error('Database error:', err);
});

// Route to add a new user
app.post('/api/addUser', async (req, res) => {
  const { fingerprint_id, name, email } = req.body;
  try {
    const result = await db.query('INSERT INTO users (fingerprint_id, name, email) VALUES (?, ?, ?)', [fingerprint_id, name, email]);
    res.send('User added!');
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add a new locker
app.post('/api/addLocker', async (req, res) => {
  const { locker_number } = req.body;
  try {
    const result = await db.query('INSERT INTO lockers (locker_number, status) VALUES (?, "available")', [locker_number]);
    res.send('Locker added!');
  } catch (err) {
    console.error('Error adding locker:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update billing information
app.post('/api/updateBilling', async (req, res) => {
  const { user_id, locker_id, voltage, current, power } = req.body;
  try {
    const result = await db.query('INSERT INTO billing (user_id, locker_id, voltage, current, power) VALUES (?, ?, ?, ?, ?)', [user_id, locker_id, voltage, current, power]);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
