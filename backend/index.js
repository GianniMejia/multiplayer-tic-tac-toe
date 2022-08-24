import express from "express";
import "dotenv/config";
import db from "./db/db.js";
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 3002; //Heroku || localhost port number

app.use(express.json());
app.get("/", async (req, res) => {});

app.post("/api/signup", async (req, res) => {
  try {
    // TODO: If the user is already logged in...
    // if (req.session.userId) {
    //   res.redirect("/");
    //   return;
    // }

    if (!req.body.username) {
      res.status(400).send({ message: "Please enter a username." });
      return;
    }

    if (!req.body.password) {
      res.status(400).send({ message: "Please enter a password." });
      return;
    }

    // if (await User.findOne({ where: { username: req.body.username } })) {
    //   res.status(400).send({ message: "That username is taken." });
    //   return;
    // }

    const user = null;
    // const user = await User.create({
    //   ...req.body,
    //   passwordHash: await bcrypt.hash(req.body.password, 1),
    // });

    // TODO: Save user data in JWT (log them in)...
    // req.session.userId = user.id;
    // req.session.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    // TODO: If the user's already logged in...
    // if (req.session.userId) {
    //   res.redirect("/");
    //   return;
    // }

    if (!req.body.username) {
      res.status(400).send({ message: "Please enter a username." });
      return;
    }

    if (!req.body.password) {
      res.status(400).send({ message: "Please enter a password." });
      return;
    }

    const user = null;
    // const user = await User.findOne({
    //   where: { username: req.body.username },
    // });

    if (!user) {
      res.status(400).send({ message: "Invalid username/password." });
      return;
    }

    if (!bcrypt.compare(req.body.password, user.passwordHash)) {
      res.status(400).send({ message: "Invalid username/password." });
      return;
    }

    // TODO: Save user data in the JWT (log them in)
    // req.session.userId = user.id;
    // req.session.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

app.get("/api/current-user", async (req, res) => {
  try {
    // TODO: If the user is NOT logged in...
    // if (!req.session.userId) {
    //   res.status(200).send("null");
    //   return;
    // }
    // res
    //   .status(200)
    //   .send(await User.findOne({ where: { id: req.session.userId } }));
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
    console.log(error);
  }
});

app.listen(PORT, () => console.log("server running." + PORT));
