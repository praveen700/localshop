const loggerFuncion = require("./logger");

let logger = null;

if(process.env.NODE_ENV !=="production"){
    logger = loggerFuncion()
}

module.exports = logger