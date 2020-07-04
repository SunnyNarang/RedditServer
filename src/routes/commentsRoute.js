const auth = require("../Auth/Auth")
module.exports = (app) => {
  const Comments = require("../controllers/comments.controller.js");

  app.get("/getCommentsByID/:id",auth, Comments.getCommentsByID);
  app.post("/postComment",auth,Comments.postComment)
 
};