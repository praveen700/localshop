const createOrder = (body) => {
    return{
        sql:`INSERT INTO Orders SET ?`,
        values: body,
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

module.exports = {createOrder, getOrderQuery, getOrderCustomer, getOrderOfCustomerByID, getOrderOfByID};
