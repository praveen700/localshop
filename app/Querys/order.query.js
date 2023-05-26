const createOrder = (body) => {
    return{
        sql:`INSERT INTO Orders SET ?`,
        values: body,
    }
}

const createOrderItems = (body) => {
    return{
        sql:`INSERT INTO Order_Items SET ?`,
        values: body,
    }
}
const updateOrderItemsById= (body, orderItemId) => {
    return{
        sql:`UPDATE Order_Items SET ? WHERE order_item_id = ?`,
        values: [body, orderItemId],

    }
}
const getOrderQuery = `Select * from Orders;`

const getOrderCustomer =`select c.customer_id,  c.name, c.email, c.phone, c.shipping_address, c.billing_address, o.status, o.order_date, o.order_id from Orders o join Customers c  on c.customer_id = o.order_id;`

const getOrderOfCustomerByID =(id) => {
    return {
        sql: 'Select * FROM Customers WHERE customer_id = ?',
        values: [id],
    }
}
const getOrderOfByID =(customer_id) => {
    return {
        sql: `Select * FROM Orders where customer_id = ?`,
        values:[customer_id]
       
    }
}

const fecthCustomerOrderItems= (customerId) =>{
    return {
        sql: `select  c.name, c.email, c.billing_address, c.shipping_address, c.phone, O.status, O.order_date, O.order_id, c.customer_id  from Customers c
        join Orders O on c.customer_id = O.customer_id
        where c.customer_id = ?;`,
        values:[customerId]
       
    }
}

const fetchOrderItems = (orderId) => {
   return {
    sql: `select OI.order_id, OI.product_id, OI.quantity, OI.price, p.price, p.name, p.description, p.image_url, p.category_id, p.product_id from Order_Items OI
    join Products p on OI.product_id = p.product_id
    where order_id = ?`,
    values:[orderId]
   }
}

module.exports = {
    createOrder, 
    getOrderQuery, 
    getOrderCustomer, 
    getOrderOfCustomerByID, 
    getOrderOfByID, 
    createOrderItems,
    fecthCustomerOrderItems,
    fetchOrderItems,
    updateOrderItemsById
};
