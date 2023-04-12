module.exports = app => {
    var router = require("express").Router();
    const product = require("../controllers/product.controller");
    router.get("/", product.fetchProduct);
    router.put("/:id", product.updateProducts);
    router.delete("/:id", product.delteProductByID);
    router.post("/category/:id", product.createProduct);
    router.get("/category", product.fetchCateogeryWise);
    router.get("/all-category-all-products", product.landingPage);
    app.use('/api/products', router);
  };