const express = require("express");
const bcrypt = require("bcryptjs");

const AuthController = require("../controllers/Authcontroller");
const { User } = require("../models/User");
const { validateUser } = require("../middleware/validation");
const { generateToken } = require("../middleware/token");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    }

    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    let user = new User({
        name,
        email,
        password: hashedPassword,
    });

    user.save();

    const token = generateToken(user.id, user.name, user.email);

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
                    let token = generateToken(user.id, user.name, user.email);
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

module.exports = router;
