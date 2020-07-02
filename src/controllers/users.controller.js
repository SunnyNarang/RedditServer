const Users = require("../models/users");
const bcrypt = require("bcrypt");
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  bcrypt.hash(req.body.password, 10).then(function (hash) {
    const user = new Users({
      username: req.body.username,
      password: hash,
    });
    Users.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message + " Some error occurred while creating the Customer.",
        });
      else res.send(data);
    });
  });
};

exports.auth = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = new Users({
    username: req.body.username,
    password: req.body.password,
  });

  Users.checkpass(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
    }
    res.send(data.row);
  });
};
