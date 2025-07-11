import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/usersRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import { register } from "./controllers/auth.js";
//import { createPost } from "./controllers/posts.js";

import { verifyToken } from "./middleware/authMiddleware.js";

/*Middleware and package configurations */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*Storage configuration */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*Routes with file uploads */

app.post("/auth/register", upload.single("picture"), register);
//app.post("/posts", upload.single("picture"), verifyToken, createPost);

/*Routes */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*Mongoose setup */

const port = process.env.PORT || 6000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection error: ${error}`);
  });