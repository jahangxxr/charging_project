const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connected!');
});

app.post('/api/addUser', (req, res) => {
  const { fingerprint_id, name, email } = req.body;
  const query = 'INSERT INTO users (fingerprint_id, name, email) VALUES (?, ?, ?)';
  db.query(query, [fingerprint_id, name, email], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('User added!');
  });
});

app.post('/api/addLocker', (req, res) => {
  const { locker_number } = req.body;
  const query = 'INSERT INTO lockers (locker_number, status) VALUES (?, "available")';
  db.query(query, [locker_number], (err, result) => {
    if (err) {
      console.error('Error adding locker:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('Locker added!');
  });
});

app.post('/api/updateBilling', (req, res) => {
  const { user_id, locker_id, voltage, current, power } = req.body;
  const query = 'INSERT INTO billing (user_id, locker_id, voltage, current, power) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [user_id, locker_id, voltage, current, power], (err, result) => {
    if (err) {
      console.error('Error updating billing:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('Billing data inserted!');
  });
});

// Define route handler for GET request to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
