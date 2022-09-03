import mongoose from "mongoose";
const { Schema, model } = mongoose;

const matchSchema = new Schema({
  board: {
    type: String,
    default: `[[null, null, null], [null, null, null], [null, null, null]]`,
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user1Symbol: {
    type: String,
    default: "X",
  },
  user2Symbol: {
    type: String,
    default: "O",
  },
  activeUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  loser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

export default model("Match", matchSchema);
