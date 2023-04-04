const db = require("./config");
const mysql  = require("mysql2/promise");

const pool = mysql.createPool({
  HOST: db.DB_HOST,
  USER: db.DB_USER,
  PASSWORD: db.DB_PASSWORD,
  DB: db.DB_NAME
})

module.exports = {pool}