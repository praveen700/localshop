module.exports = app => {
  var router = require("express").Router();
  const cust = require("../controllers/customers.controller.js");
  const fetchCus = require("../controllers/customer.get")

  // Create a new cust
  router.post("/", cust.create);
  router.get("/", fetchCus.fetchCustomer);
  app.use('/api/customers', router);
};
