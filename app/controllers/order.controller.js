const sql = require("../models/db");
const qu = require("../Querys/order.query");
module.exports = {
    createOrders: (req, res, next) => {
        sql.query(qu.createOrder(req.body), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                let payloadSend = {
                    message: `Thank you for placing an order with us. Your order has been received`,
                }
                res.status(200).json({
                    status: true, data: payloadSend})
            }
        })
    },
    fetchOrder:(req, res, next) => {
        sql.query(qu.getOrderQuery, (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
               
                res.status(200).json({
                    status: true, data: data})
            }
        })
    },
    fetchOrderAllCustomer:(req, res, next) => {
        sql.query(qu.getOrderCustomer, (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
               
                res.status(200).json({
                    status: true, data: data})
            }
        })
    },
    fetchOrderByCustomerId:(req, res, next) => {
        sql.query(qu.getOrderOfCustomerByID(req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                  sql.query(qu.getOrderOfByID(req.params.id), (err, orderData) => {
                    if (err) {
                        res.status(403).json({ error: err.message });
                    }else{
                       data.forEach(obj => obj.orders = orderData);
                        res.status(200).json({
                            status: true, data: data})
                    }
                  })

                
            }
        })
    },
    // Order Items;
    createOrderItems: (req, res, next) => {
        sql.query(qu.createOrderItems(req.body), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                res.status(200).json({
                    status: true, data: data, message : `Thank you for placing an order with us. Your order has been received`})
            }
        })

    },
    updateOrderItems: (req, res, next) => {
        sql.query(qu.updateOrderItemsById(req.body, req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                res.status(200).json({
                    status: true, data: data, message : `Upadated Order Items`})
            }
        })

    },
    getOrderItemsByCustomerID:(req, res, next) => {
        sql.query(qu.fecthCustomerOrderItems(req.params.id), (err, data) => {
            if (err) {
                res.status(403).json({ error: err.message });
            } else {
                if(data.length){
                    sql.query(qu.fetchOrderItems(data[0].order_id), (err, orderItemsData) => {
                        if (err) {
                            res.status(403).json({ error: err.message });
                        }else{
                            data.forEach(obj => obj.orderItems = orderItemsData);
                            res.status(200).json({status: true, data: data})
                        }
                      })
                }else{
                    res.status(200).json({status: true, message: "Your Cart is Empty!"})
                }

            }
        })

    },

};





