module.exports = app => {
    var router = require("express").Router();
    const product = require("../controllers/product.controller");
    // Create a new product
    router.get("/", product.fetchProduct);
    app.use('/api/products', router);
  };