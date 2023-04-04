const Customers = require("../models/customers.model.js");

const cust = new Customers({
  name: req.body.name,
  email: req.body.email,
  phone: req.body.phone,
  shipping_address:req.body.shipping_address,
  billing_address: req.body.billing_address
});
// Create and Save a new Tutorial
exports.create = (req, res) => {
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

// Retrieve all Tutorials from the database (with condition).
// exports.findAll = (req, res) => {
//   const title = req.query.title;

//   Tutorial.getAll(title, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Find a single Tutorial by Id
// exports.findOne = (req, res) => {
//   Tutorial.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Tutorial.updateById(
//     req.params.id,
//     new Tutorial(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Tutorial with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Tutorial with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   Tutorial.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Tutorial was deleted successfully!` });
//   });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };
