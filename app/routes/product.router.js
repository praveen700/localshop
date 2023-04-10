module.exports = app => {
    var router = require("express").Router();
    const product = require("../controllers/product.controller");
    router.get("/", product.fetchProduct);
    router.put("/:id", product.updateProducts);
    router.get("/category", product.fetchCateogeryWise);
    router.post("/category/:id", product.createProduct);
    app.use('/api/products', router);
  };