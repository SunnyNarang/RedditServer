module.exports = (app) => {
  const Users = require("../controllers/users.controller.js");

  // Create a new Customer
  app.post("/adduser", Users.create);
  app.post("/checkuser", Users.auth);
};
