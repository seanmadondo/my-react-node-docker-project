const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");

const app = express();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});

app.get('/jobs', (req, res) => {
  pool.query(`SELECT * FROM jobs`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  }); 
});

app.get('/categories', (req, res) => {
  pool.query(`SELECT * FROM categories`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  }); 
});

app.get('/suburbs', (req, res) => {
  pool.query(`SELECT * FROM suburbs`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  }); 
});

app.put('/jobs/:id', (req, res) => {
  const query = `UPDATE jobs SET status = '${req.body.status}' WHERE id=${req.params.id}`
  pool.query(query, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(results);
    }
  }); 
});