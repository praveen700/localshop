module.exports = app => {
  const cust = require("../controllers/customers.controller.js");
  var router = require("express").Router();

  // Create a new cust
  router.post("/", cust.create);
  app.use('/api/customers', router);
};
