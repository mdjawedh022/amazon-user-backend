const { Schema, model } = require("mongoose");

const AuthSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  mobile_no: { type: Number },
  password: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Authuser = model("userauth", AuthSchema);

module.exports = Authuser;
