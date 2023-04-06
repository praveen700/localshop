const sql = require("../models/db");
const Customers = require("../models/customers.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const cust = new Customers({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    shipping_address:req.body.shipping_address,
    billing_address: req.body.billing_address
  });
  if (!req.body) {
    res.status(405).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Tutorial
  if(!req.body.name){
    res.status(405).json({message:"Name couid not be empty"})
    return
  }
  if(!req.body.email){
    res.status(405).json({message:"email couid not be empty"})
    return
  }
  if(!req.body.phone){
    res.status(405).json({message:"phone couid not be empty"})
    return
  }
  if(!req.body.shipping_address){
    res.status(405).json({message:"shipping_address couid not be empty"})
    return
  }
  if(!req.body.billing_address){
    res.status(405).json({message:"billing_address couid not be empty"})
    return
  }else{
    Customers.create(cust, (err, data) => {
      if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.status(200).json({message: "successfully created customer", status: true});
    });

  }

};
