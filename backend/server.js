const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const uri = process.env.MONGO_URL;
const port = process.env.PORT || 6000;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Momgo DB"))
  .catch((error) => console.error(error));

app.use(cors());
app.listen(port, () => {
  console.log("Backend is running");
});
//temp
//app.use(bodyParser.json({ limit: "50mb", extended: true }));
//app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//app.use(cors());
//maryumhabib - mongo username
//6Azp9naeirNOYab5 - mongo pwd
