const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt=require('jsonwebtoken')
const config =require('config')
const passwordComplexity = require("joi-password-complexity");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, config.get("jwtPrivateKey"));
  return token;
};
const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    // password: passwordComplexity().required() its work if you need password validation
    password: Joi.required(),
  });
  return schema.validate(user);
}
exports.User = User;
exports.validate = validateUser;
