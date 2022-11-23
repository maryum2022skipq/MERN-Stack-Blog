const express = require("express");
const dotenv = require("dotenv").config({
  path: "E:/Personal Projects/Blog/.env",
});
const cors = require("cors");
const colors = require("colors");

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", require("./routes/postsRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log("Backend is running");
});

//mongoose
//  .connect(uri, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//  })
//  .then(() => console.log("Connected to Momgo DB"))
//  .catch((error) => console.error(error));
//
//app.use(cors());
//app.listen(port, () => {
//  console.log("Backend is running");
//});
//temp
//app.use(bodyParser.json({ limit: "50mb", extended: true }));
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//app.use(cors());
//maryumhabib - mongo username
//6Azp9naeirNOYab5 - mongo pwd
