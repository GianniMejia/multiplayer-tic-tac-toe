import mongoose from "mongoose";
const { connect } = mongoose;

export default connect(
  "mongodb://localhost/multiplayer-tic-tac-toe",
  () => {
    console.log("Connected to mongodb!");
  },
  (error) => {
    console.log(error);
  }
);
