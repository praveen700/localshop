const mysql = require("mysql");
const db = require("../config/config");

var connection = mysql.createPool({
  host: db.DB_HOST,
  user: db.DB_USER,
  password: db.DB_PASSWORD,
  database: db.DB_NAME,
  connectTimeout: 10000 
});

module.exports = connection;
