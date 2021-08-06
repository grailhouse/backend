const server = require("./server");
const mongoose = require("mongoose");
require("dotenv").config();


const port = process.env.PORT || 5001;
mongoose.Promise = global.Promise;

server.listen(port, () => {
  console.log("Sneaks app listening on port ", port);
});

