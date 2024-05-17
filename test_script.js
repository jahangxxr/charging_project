// test_script.js

const axios = require('axios');

// Function to add a new user
async function addUser() {
  try {
    const response = await axios.post('http://localhost:3000/api/addUser', {
      fingerprint_id: '123',
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

// Function to add a new locker
async function addLocker() {
  try {
    const response = await axios.post('http://localhost:3000/api/addLocker', {
      locker_number: 'A001'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error adding locker:', error.message);
  }
}

// Function to update billing information
async function updateBilling() {
  try {
    const response = await axios.post('http://localhost:3000/api/updateBilling', {
      user_id: 1,
      locker_id: 1,
      voltage: 220,
      current: 10,
      power: 2200
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error updating billing:', error.message);
  }
}

// Call functions to test API endpoints
addUser();
addLocker();
updateBilling();
