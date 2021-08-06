const app = require("./server");
const mongoose = require("mongoose");
const helmet = require('helmet');
const cors = require('cors');
require("dotenv").config();

app.use(cors());
app.use(helmet());



const port = process.env.PORT || 5001;
mongoose.Promise = global.Promise;

app.listen(port, () => {
  console.log("Sneaks app listening on port ", port);
});

