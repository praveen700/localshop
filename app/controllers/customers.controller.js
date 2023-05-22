

const qu = require("../Querys/customer.query");
const sql = require("../models/db");

module.exports = {
  createdCustomer: (req, res, next) => {
    const phone = req.body.phone;
    const name = req.body.name;
    const email = req.body.email;
    const shipping_address = req.body.shipping_address;
    const billing_address = req.body.billing_address;
  
    if (!phone) {
      return res.status(405).json({ message: "Mobile could not be empty!" });
    }
  
    sql.query("SELECT * FROM Customers WHERE phone = ?", [phone], (err, data) => {
      if (err) {
        return res.status(403).json({ error: err.message });
      }
  
      if (data?.length > 0) {
        return res.status(200).json({ status: true, message: "User already registered with this number" });
      }
  
      if (!name) {
        return res.status(405).json({ message: "Name could not be empty" });
      }
      if (!email) {
        return res.status(405).json({ message: "Email could not be empty" });
      }
      if (!shipping_address) {
        return res.status(405).json({ message: "Shipping address could not be empty" });
      }
      if (!billing_address) {
        return res.status(405).json({ message: "Billing address could not be empty" });
      }
      const customerData = {
        name,
        email,
        phone,
        shipping_address,
        billing_address
      };
      sql.query(qu.postCustomer(customerData), (err, data) => {
        if (err) {
          return res.status(403).json({ error: err.message });
        }
  
        return res.status(200).json({ status: true, data: "Customer created successfully" });
      });
    });
  },

};







// 

