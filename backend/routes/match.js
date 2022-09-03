import { Router } from "express";
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Match from "../models/Match.js";

const router = Router();

const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

router.post("/", jwtMiddleware, async (req, res) => {
  try {
    if (!req.body.opponentUsername) {
      res.status(400).send({ message: "Please enter an opponent username." });
      return;
    }

    const opponent = await User.findOne({
      username: req.body.opponentUsername,
    });

    if (!opponent) {
      res.status(400).send({ message: "There is no user with that username." });
      return;
    }

    const user = await User.findById(req.auth.userId);

    if (opponent.id == user.id) {
      res.status(400).send({ message: "You can't challenge yourself!" });
      return;
    }

    const match = new Match({
      user1: user.id,
      user2: opponent.id,
    });

    await match.save();

    res.send({ match: match });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

router.get("/:id", jwtMiddleware, async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404).send({ message: "Match not found." });
      return;
    }

    const match = await Match.findById(req.params.id);

    if (req.auth.userId != match.user1 && req.auth.userId != match.user2) {
      res.status(401).send({ message: "Unauthorized." });
      return;
    }

    res.send({ match: match });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

router.put("/:id", jwtMiddleware, async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404).send({ message: "Match not found." });
      return;
    }

    const match = await Match.findById(req.params.id);

    if (
      req.auth.userId != match.user1._id.toString() &&
      req.auth.userId != match.user2._id.toString()
    ) {
      res.status(401).send({ message: "Unauthorized." });
      return;
    }

    if (isNaN(req.body.x) || isNaN(req.body.y)) {
      res.status(400).send({ message: "Invalid coordinates." });
      return;
    }

    // RULE: You can't go unless it's your turn
    if (
      match.activeUser &&
      match.activeUser._id.toString() != req.auth.userId
    ) {
      res.status(400).send({ message: "It's not your turn!" });
      return;
    }

    if (!match.activeUser) {
      match.activeUser = req.auth.userId;
    }

    const board = JSON.parse(match.board);

    // RULE: You can't go on a taken space
    if (board[req.body.y][req.body.x]) {
      res.status(400).send({ message: "That space is taken!" });
      return;
    }

    // Mark the board appropriately
    board[req.body.y][req.body.x] =
      req.auth.userId == match.user1._id.toString()
        ? match.user1Symbol
        : match.user2Symbol;

    match.board = JSON.stringify(board);

    // Switch the active user
    match.activeUser = match.activeUser.id.equals(match.user1.id)
      ? match.user2
      : match.user1;

    await match.save();

    res.send({ match: match });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

export default router;
