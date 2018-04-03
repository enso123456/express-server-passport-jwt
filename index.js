const express = require("express")
const http = require("http")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const router = require("./router")


mongoose.connect("mongodb://localhost/auth", function(err) {
  if (err) {
    return console.log("Error connecting to database")
  }

  console.log("You are connected to the database")
})

const PORT = process.env.PORT || 3000

app.use(morgan("combined"))

app.use(bodyParser.json({type: "*/*"}))

router(app)

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server at port: ${PORT}`)
})
