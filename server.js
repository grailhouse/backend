const express = require("express");
const server = express();
const { json } = require("body-parser");
const sneakerRoutes = require("./routes/sneaks.routes");
const authRoutes = require("./routes/auth.routes");
const helmet = require("helmet");
const cors = require("cors");

server.use(json());
server.use(cors());
server.use(helmet());

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use("/api/sneakers", sneakerRoutes);
server.use("/api", authRoutes);

server.get("/", function (req, res) {
    res.json({ msg: "Welcome to Gail Hosue api" });
});

module.exports = server;
