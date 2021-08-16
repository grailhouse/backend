const jwt = require("jsonwebtoken");

let jwt_key = process.env.JWT_KEY || "verySecretValue";

function generateToken(userId, name, email) {
    return jwt.sign(
        {
            id: userId,
            name: name,
            email: email,
        },
        jwt_key,
        { expiresIn: "1h" }
    );
}

module.exports = {
    generateToken,
};
