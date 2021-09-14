const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    shoeSize: {
        type: Number,
        required: true,
        minlength: 1,
    },
    closet: [
        {
            shoeName: String,
            shoeId: String,
            styleId: String,
            lowestPrice: Number,
            lowestResellPrice: {
                stockX: Number,
                stadiumGoods: Number,
                goat: Number,
                flightClub: Number,
            },
            thumbnail: String,
            deadstock: Boolean,
        },
    ],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
