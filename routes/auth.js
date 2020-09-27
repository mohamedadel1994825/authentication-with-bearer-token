const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");
const express = require("express");
const bearerToken = require('express-bearer-token');
const router = express.Router();
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password.");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password.");
  const token = user.generateAuthToken()
  res.send({ token });
});
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    // password: passwordComplexity().required() its work if you need password validation
    password: Joi.required(),
  });
  return schema.validate(req);
}
module.exports = router;
