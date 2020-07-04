const auth = require("../Auth/Auth")
module.exports = (app) => {
  const Community = require("../controllers/community.controller.js");

  // Create a new Customer
  app.get("/getall", auth, Community.getAll);
  app.get("/getcomm/:id",auth, Community.getComm);
 
};