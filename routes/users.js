const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const _ = require("lodash");
const express = require("express"); 
const router = express.Router();
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const sault =await bcrypt.genSalt(10);
  user.password= await bcrypt.hash(user.password,sault)
  await user.save();
  res.send(_.pick(user, ["id", "name", "email"]));
});
module.exports = router;
