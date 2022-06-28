const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
  desc: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
  
});

module.exports = mongoose.model("User", userSchema);
