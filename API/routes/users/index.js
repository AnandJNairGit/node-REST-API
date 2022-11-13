const express = require("express");
const { default: mongoose } = require("mongoose");
const Users = require("../../models/user");
const router = express.Router();

const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const user = new Users({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      console.log("the user data is:------>", user);
    }
  });
});

module.exports = router;
