const express = require("express");
const server = express();
const sneakerRoutes = require("./routes/sneaks.routes");
const helmet = require('helmet');
const cors = require('cors');
server.use(cors());
server.use(helmet());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

server.use("/api", sneakerRoutes);

server.get("/", function(req, res) {
  res.json({msg: "Welcome to Gail Hosue api"});
});

module.exports = server;

