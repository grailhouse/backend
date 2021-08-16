const { User, validateUser } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
    const { error } = validateUser(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err,
            });
        }
        let user = new User({
            name,
            email,
            password: hashedPass,
        });

        user.save();

        res.status(201).send(user);
    });
};

const login = (req, res, next) => {
    const { name, password } = req.body;

    let existingUser = User.findOne({ name });

    if (existingUser) {
        console.log(existingUser);
        bcrypt.compare(password, existingUser.password, function (err, result) {
            if (err) {
                res.status(400).send({ errors: [{ message: err }] });
            }
            if (result) {
                let token = jwt.sign({ name: user.name }, "verySecretValue", { expiresIn: "1h" });
                res.json({
                    message: "Login Successful",
                    token,
                });
            }
        });
    } else {
        res.status(500).json({
            message: "No user found",
        });
    }
};

module.exports = {
    register,
    login,
};
