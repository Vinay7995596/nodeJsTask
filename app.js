const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require('path');

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vinay'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set the view engine to use EJS (or any other template engine you prefer)
app.set('view engine', 'ejs');

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Save data
app.post('/save_data', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO smallproject (name, email) VALUES ("vinay", "vinay@gmail.com")';

  db.query(sql, [descreption, unit, rate, amount], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data: ' + err.message);
    } else {
      console.log('Data inserted successfully');
      res.redirect('/success');
    }
  });
});

// Display success message
app.get('/success', (req, res) => {
  res.render('success');
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
