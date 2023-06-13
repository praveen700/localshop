const mysql = require("mysql");
const db = require("../config/config");
const logger = require("../indexLogger");

let connection = mysql.createPool({
  host: db.DB_HOST,
  user: db.DB_USER,
  password: db.DB_PASSWORD,
  database: db.DB_NAME,
});
logger.info('Connected to the database successfully.')

module.exports = connection;
