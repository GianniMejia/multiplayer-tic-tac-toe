import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find().sort([["winLossRatio", -1]]);

    res.send(leaderboard);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

export default router;
