const sql = require("../models/db");
const qu = require("../Querys/customer.query");
const bcrypt = require('bcrypt');
const Redis = require("redis");
const redisCLient = Redis.createClient({ socket: { port: 6360 } });
const DEFAULT_EXPIRATION = 3600;
redisCLient.connect();

module.exports = {
  fetchCustomer: async (req, res, next) => {
    try {
      const totalCount = await new Promise((resolve, reject) => {
        sql.query(qu.searchCount(req.query.search), (err, totalCount) => {
          if (err) {
            reject(err);
          } else {
            resolve(totalCount);
          }
        });
      });

      const querys = qu.fetchQuery(req.query.search, req.query.page, req.query.pageSize);
      sql.query(querys, (err, data) => {
        if (err) {
          res.status(403).json({ error: err.message });
        } else {
          const total = JSON.parse(JSON.stringify(totalCount)).reduce((a) => a.total_count);
          res.status(200).json({ status: true, data: data, totalCount: total });
        }
      });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },
  fetchCustomerById: async(req, res, next) => {
    const customerData = await redisCLient.get(`customerById:${req.params.id}`);
    if (customerData !==null) {
      res.status(200).json(JSON.parse(customerData))
    } else {
      try {
        sql.query(qu.fetchCustById(req.params.id), (err, data) => {
          if (err) {
            res.status(403).json({ error: err.message });
          } else {
            let custData = { status: true, data: data }
            redisCLient.setEx(`customerById:${req.params.id}`, DEFAULT_EXPIRATION, JSON.stringify(custData));
            res.status(200).json({ status: true, data: data });
          }
        });
      } catch(error) {
        res.status(403).json({ error: err.message });
      }
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const data = await new Promise((resolve, reject) => {
        sql.query(qu.fetchCustByPhone(req.body.phone), (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      const result = await bcrypt.compare(req.body.password, data[0].password);
      if (result) {
        res.status(200).json({ status: true, message: "Login successful", data: data });
      } else {
        return res.status(401).json({ error: 'Invalid username or password', status: false });
      }
    } catch (err) {
      res.status(401).json({ error: "Invalid username or password", status: false, });
    }
  }
};

