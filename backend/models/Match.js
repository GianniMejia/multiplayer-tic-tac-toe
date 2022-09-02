import mongoose from "mongoose";
const { Schema, model } = mongoose;

const matchSchema = new Schema({
  board: {
    type: Array,
    default: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  },
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
