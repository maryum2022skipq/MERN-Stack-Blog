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
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/categories", require("./routes/categoriesRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log("Backend is running");
});

//maryumhabib - mongo username
//6Azp9naeirNOYab5 - mongo pwd
