import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  passwordHash: String,
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  winLossRatio: {
    type: Number,
    default: null,
  },
});

export default model("User", userSchema);
