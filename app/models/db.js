const mysql = require("mysql");
const db = require("../config/config");

let connection = mysql.createPool({
  host: db.DB_HOST,
  user: db.DB_USER,
  password: db.DB_PASSWORD,
  database: db.DB_NAME,
});


module.exports = connection;
