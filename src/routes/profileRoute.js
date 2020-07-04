const auth = require("../Auth/Auth")

module.exports = (app) => {
  const Profile = require("../controllers/profile.controller.js");

  // Create a new Customer
  app.post("/addprofile", auth,Profile.create);
  app.post("/updateprofile", auth,Profile.update);
  app.get("/getprofile/:id", auth,Profile.getdata);
  
};
