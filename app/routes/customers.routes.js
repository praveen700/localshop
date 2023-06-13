module.exports = app => {
  var router = require("express").Router();
  const cust = require("../controllers/customers.controller.js");
  const fetchCus = require("../controllers/customer.get")

  // Create a new cust
  router.post("/", cust.createdCustomer);
  router.get("/", fetchCus.fetchCustomer);
  router.get("/:id", fetchCus.fetchCustomerById);
  router.put("/:id", fetchCus.updateUser);
  router.post("/login-user", fetchCus.loginUser);
  app.use('/api/customers', router);
};
