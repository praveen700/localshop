const express = require("express");
const cors = require("cors");
const Redis = require("redis");
const logger = require("./app/indexLogger");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to local shop application." });
});

require("./app/routes/customers.routes.js")(app);
require("./app/routes/product.router")(app);
require("./app/routes/order.router.js")(app);
// set port, listen for requests
const PORT = process.env.PORT || 9000;
// redis port
const REDIS_PORT = process.env.REDIS_PORT;
const redisCLient = Redis.createClient({ socket: { port: REDIS_PORT } });
// Redis.createClient(REDIS_PORT);
redisCLient.connect();

redisCLient.on("connect",() => {
  logger.info(`Connected to Redis on port ${REDIS_PORT}.`);
});

redisCLient.on('error', function(err) {
  console.error('Error:', err);
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
});
