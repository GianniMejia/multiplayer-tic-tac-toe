import express from "express";
import "dotenv/config";
// import db from "./db/db.js";
import bcrypt from "bcrypt";
import cors from "cors";
import authRouter from "./routes/auth.js";
import matchRouter from "./routes/match.js";
import userRouter from "./routes/user.js";
import { expressjwt } from "express-jwt";
import "dotenv";
import db from "./db.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3002; //Heroku || localhost port number

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// API Routes:
app.use("/api/auth", authRouter);
app.use("/api/match", matchRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log("Server running on port " + PORT));
