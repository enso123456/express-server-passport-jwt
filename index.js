const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router");
var dotenv = require('dotenv');

dotenv.load();

//DB SETUP
const mongoURI = process.env.MONGO_DB;
mongoose.connect(mongoURI, function(err) {
  if (err) {
    return console.log("Error connecting to database");
  }
  console.log("You are connected to the database");
});

//App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server at port: ${PORT}`);
});
