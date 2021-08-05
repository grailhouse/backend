const express = require("express");
const app = express();
const sneakerRoutes = require("./routes/sneaks.routes");


app.use("api/sneakers", sneakerRoutes);

app.get("/", function(req, res) {
  res.json({msg: "Welcome to Gail Hosue api"});
});

module.exports = app;

