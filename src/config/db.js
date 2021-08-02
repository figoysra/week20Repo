const mysql = require('mysql2');
const { DB_USERNAME, DB_PASSWORD } = require('../helpers/env');

const connection = mysql.createConnection({
  host: 'localhost',
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: 'db_coffeeshop',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('koneksi aman bos');
  }
});

module.exports = connection;
