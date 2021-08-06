const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const cors = require('cors');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('./routes/sneaks.routes.js')(app);
require('dotenv').config();


var port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

app.listen(port, function () {
  console.log(`Sneaks app listening on port `, port);
 });

module.exports = app;