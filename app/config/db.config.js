const db = require("./config");

module.exports = {
  HOST: db.DB_HOST,
  USER: db.DB_USER,
  PASSWORD: db.DB_PASSWORD,
  DB: db.DB_NAME
};