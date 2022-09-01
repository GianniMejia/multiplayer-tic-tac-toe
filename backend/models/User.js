import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  passwordHash: String,
});

export default model("User", userSchema);
