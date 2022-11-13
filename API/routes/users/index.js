const express = require("express");
const { default: mongoose } = require("mongoose");
const Users = require("../../models/user");
const router = express.Router();

router.post("/signup", (req,res,next)=>{

  const user = new Users({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
   email:req.body.email,
   password:req.body.password
  });
});
module.exports = router;