const express = require("express");
const { default: mongoose } = require("mongoose");
const Users = require("../../models/user");
const router = express.Router();

const bcrypt = require("bcrypt");

router.post("/signup", async (req, res, next) => {
  //GET USER BY EMAIL ID
  const foundUser = await Users.find({ email: req.body.email });
  console.log("the found user is------->>", foundUser);
  //VALIDATE IF USER EXISTS OR NOT
  if (foundUser.length >= 1) {
    res.status(400).json({ message: "user email already exists" });
  } else {
    //HASH THE PASSWORD
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const user = new Users({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });

        //   console.log("the user data is:------>", user);
        try {
          const userRes = await user.save();
          console.log("the response is------>", userRes);
          res.status(200).json({
            message: "User Created",
            userData: { name: userRes.name, email: userRes.email },
          });
        } catch (error) {
          res.status(500).json(err);
        }
      }
    });
  }
});


module.exports = router;
