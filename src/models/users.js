const sql = require("./db.js");
const bcrypt = require("bcrypt");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.checkpass = (user, result) => {
  sql.query(
    "select * from users where username = '" + user.username + "'",
    function (err, result2, fields) {
      if (err) throw err;

      Object.keys(result2).forEach(function (key) {
        var row = result2[key];
        bcrypt.compare(user.password, row.password).then(function (res) {
          if (res === true) {
            result(null, { row });
          } else {
            result("password didn't match", null);
          }
        });
      });
    }
  );
};

module.exports = User;
