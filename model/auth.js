const { Schema, mongoose } = require("mongoose");

const AuthSchema = new Schema({
  name: { type: String },
  email: { type: String },
  Mobile_no: { type: Number },
  password: { type: String },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
