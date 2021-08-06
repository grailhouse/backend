const app = require("./server");
const mongoose = require("mongoose");
const helmet = require('helmet');
const cors = require('cors');
require("dotenv").config();

app.use(cors());
app.use(helmet());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 5001;
mongoose.Promise = global.Promise;

app.listen(port, () => {
  console.log("Sneaks app listening on port ", port);
});

