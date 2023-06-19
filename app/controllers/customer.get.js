const sql = require("../models/db");
const qu = require("../Querys/customer.query");
const bcrypt = require('bcrypt');
const Redis = require("redis");
const logger = require("../indexLogger");

const redisCLient = Redis.createClient({ socket: { port: 6360 } });
const DEFAULT_EXPIRATION = 3600;
redisCLient.connect();

module.exports = {
  fetchCustomer: async (req, res, next) => {
    try {
      const totalCount = await new Promise((resolve, reject) => {
        logger.info('GET /api/customers')
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
      logger.info('GET /api/customers', {error: err.message })
      res.status(403).json({ error: err.message });
    }
  },
  fetchCustomerById: async (req, res, next) => {
    const customerData = await redisCLient.get(`customerById:${req.params.id}`);
    if (customerData !== null) {
      logger.info( `GET ${req.originalUrl}`)
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
            logger.info(req.originalUrl)
          }
        });
      } catch (error) {
        logger.info(`GET ${req.originalUrl}`, err)
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
      logger.info(`POST ${req.originalUrl}`, err)
      res.status(401).json({ error: "Invalid username or password", status: false, });
    }
  },
   updateUser : async (req, res, next) => {
    try {
      const data = await new Promise((resolve, reject) => {
        sql.query(qu.updateCustomer(req.body, req.params.id), (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  
      res.status(200).json({
        status: true,
        message: "Customer Address update Successfully",
      });
    } catch (error) {
      logger.info(`PUT ${req.originalUrl}`, err)
      res.status(403).json({ error: error.message });
    }
  }
  
};

