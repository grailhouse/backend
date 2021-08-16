const server = require("./server");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
require("dotenv").config();

const port = process.env.PORT || 5001;

const start = async () => {
    try {
        mongoose.connect(
            "mongodb+srv://stephenfre-founder:vXcxVDgrPMSPSGah@grailhouse-west.ldnn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        );
        console.log("connected to mongodb");
    } catch (err) {
        console.log(err);
    }

    server.listen(port, () => {
        console.log("Sneaks app listening on port ", port);
    });
};

start();
