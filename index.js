const server = require("./server");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5001;
// mongoose.Promise = global.Promise;

const start = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("connected to mongodb");
    } catch (err) {
        console.log(err);
    }

    server.listen(port, () => {
        console.log("Sneaks app listening on port ", port);
    });
};

start();
