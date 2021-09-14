const express = require("express");
const bcrypt = require("bcryptjs");

const AuthController = require("../controllers/Authcontroller");
const { User } = require("../models/User");
const { validateUser } = require("../middleware/validation");
const { generateToken } = require("../middleware/token");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { error } = validateUser(req.body);
    console.log(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const { name, username, email, password, shoeSize } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    let user = new User({
        name,
        username,
        email,
        password: hashedPassword,
        shoeSize,
    });

    user.save();

    const token = generateToken(user.id, user.name, user.username, user.email, user.shoeSize);

    res.status(201).json({
        message: "new user registered!",
        user,
        token,
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    User.findOne({ email }, function (err, user) {
        if (err) {
            res.status(500).json({
                message: err,
            });
        } else if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(400).send({ errors: [{ message: err }] });
                }
                if (result) {
                    let token = generateToken(user.id, user.name, user.username, user.email, user.shoeSize);
                    res.json({
                        message: "Login Successful",
                        user,
                        token,
                    });
                }
            });
        } else {
            res.status(500).json({
                message: "sorry, but theres no user with that email!",
            });
        }
    });
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    User.findOne({ _id: id }, function (err, user) {
        if (err) {
            res.status(400).send({ errors: [{ message: err }] });
        } else if (user) {
            res.json({
                user,
            });
        }
    });
});

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    User.findOneAndUpdate({ _id: id }, req.body, { new: true }, function (err, user) {
        if (err) {
            res.status(400).send({ errors: [{ message: err }] });
        } else if (user) {
            res.json({
                user,
            });
        }
    });
});

module.exports = router;
