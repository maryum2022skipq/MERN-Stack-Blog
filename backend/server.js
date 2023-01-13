const express = require("express");
const dotenv = require("dotenv").config({
  path: "E:/PersonalProjects/Blog/.env",
});
const cors = require("cors");
const colors = require("colors");
const multer = require("multer");
const path = require("path");

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/posts", require("./routes/postsRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/categories", require("./routes/categoriesRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log("Backend is running");
});

//maryumhabib - mongo username
//6Azp9naeirNOYab5 - mongo pwd
