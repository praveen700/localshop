module.exports = app => {
    var router = require("express").Router();
    const product = require("../controllers/order.controller");
    
    router.post("/", product.createOrders);
    router.get("/", product.fetchOrder);
    router.get("/all/customers", product.fetchOrderAllCustomer);
    router.get("/customers/:id", product.fetchOrderByCustomerId);
    router.post("/customers/:id/order/items", product.createOrderItems);
    router.get("/customers/:id/order/items", product.getOrderItemsByCustomerID);
    app.use('/api/orders', router);
  };
  // 