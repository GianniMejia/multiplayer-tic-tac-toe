// import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { expressjwt } from "express-jwt";

const router = Router();

const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

router.post("/signup", async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400).send({ message: "Please enter a username." });
      return;
    }

    if (!req.body.password) {
      res.status(400).send({ message: "Please enter a password." });
      return;
    }

    if (await User.findOne({ username: req.body.username })) {
      res.status(400).send({ message: "That username is taken." });
      return;
    }
    const user = new User({
      username: req.body.username,
      passwordHash: await bcrypt.hash(req.body.password, 1),
    });

    await user.save();

    // Create the JWT for the browser to save
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    res.send({ token: token, user: user });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.username) {
      res.status(400).send({ message: "Please enter a username." });
      return;
    }

    if (!req.body.password) {
      res.status(400).send({ message: "Please enter a password." });
      return;
    }

    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(400).send({ message: "Invalid username/password." });
      return;
    }

    if (!(await bcrypt.compare(req.body.password, user.passwordHash))) {
      res.status(400).send({ message: "Invalid username/password." });
      return;
    }

    // Create the JWT for the browser to save
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
    });

    res.send({ token: token, user: user });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

router.get("/current-user", jwtMiddleware, async (req, res) => {
  try {
    if (!req.auth.userId) {
      res.status(200).send("null");
      return;
    }

    res.status(200).send(await User.findById(req.auth.userId));
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

export default router;
