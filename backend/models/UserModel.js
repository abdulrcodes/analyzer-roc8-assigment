const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps

// Create User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
