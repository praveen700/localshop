

const qu = require("../Querys/customer.query");
const sql = require("../models/db");
const bcrypt = require('bcrypt');

module.exports = {
  createdCustomer: async (req, res, next) => {
    try {
      const {
        phone,
        name,
        // confirmPassword,
        // password,
        email,
        shipping_address,
        billing_address
      } = req.body;

      if (!phone) {
        return res.status(405).json({ message: "Mobile could not be empty!" });
      }

      const data = await new Promise((resolve, reject) => {
        sql.query("SELECT * FROM Customers WHERE phone = ?", [phone], (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      if (data?.length > 0) {
        return res.status(200).json({ status: true, message: "User already registered with this number. Try logging in." });
      }

      if (!name) {
        return res.status(405).json({ message: "Name could not be empty" });
      }
      if (!req.body.confirmPassword) {
        return res.status(405).json({ message: "Confirm Password could not be empty" });
      }
      if (!req.body.password) {
        return res.status(405).json({ message: "Password could not be empty" });
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

      let salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(req.body.password, salt);
      let confirmSalt = await bcrypt.genSalt(10);
      let confirmPassword = await bcrypt.hash(req.body.confirmPassword, confirmSalt);

      const customerData = {
        name,
        password,
        confirmPassword,
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
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

}
