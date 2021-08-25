const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    closet: [
        {
            shoeName: String,
            shoeId: String,
            lowestResellPrice: {},
            thumbnail: String,
            deadstock: Boolean,
        },
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
