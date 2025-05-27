const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors()); // Agar frontend bisa mengakses API
app.use(express.json()); // Baca JSON dari request

// Koneksi ke MySQL (phpMyAdmin)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Default kosong di XAMPP
  database: "travel",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// API GET: Ambil semua user
app.get("/agen", (req, res) => {
    db.query(
      "SELECT name, rating, address, hours_today, website, phone, from_, destination, latitude, longitude, tipe FROM travel_agent",
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(result);
      }
    );
  });
  

// Jalankan server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
