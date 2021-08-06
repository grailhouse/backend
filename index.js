const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8888'}));


require('./routes/sneaks.routes.js')(app);
require('dotenv').config();


var port = process.env.PORT || 8888;
mongoose.Promise = global.Promise;

app.listen(port, function () {
  console.log(`Sneaks app listening on port `, port);
 });

module.exports = app;