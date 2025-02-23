const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 8081;

// MySQL Connection
const db = mysql.createConnection({
  host: "db", // 'db' matches the service name in docker-compose.yml
  user: "root",
  password: "password",
  database: "mydb"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Index Route
app.get("/", (req, res) => {
  res.send(`
    <p>Name: Harshada</p>
    <p>Roll Number: 2022BCD0053</p>
    <p>Bio: AI | ML enthusiast.</p>
    <p><a href="/users">View Users</a></p>
  `);
});

// **New Route: Fetch Users from Database**
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Database query failed");
    } else {
      res.json(results); // Show users as JSON
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Web Service running on http://localhost:${PORT}`);
});
