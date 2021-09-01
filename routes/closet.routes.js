const express = require("express");
const { User } = require("../models/User");
const router = express.Router();

// * Get closet shoes
router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    User.findById(userId)
        .then((user) => {
            if (user) {
                res.status(200).json(user.closet);
            } else {
                res.status(403).json({
                    message: "sorry, but that user is not registered.",
                });
            }
        })
        .catch((err) => {
            console.log(err, "err");
        });
});

// * Add closet shoes
router.post("/:userId", (req, res) => {
    const { userId } = req.params;
    const closet = req.body;

    User.findById(userId)
        .then((user) => {
            if (user) {
                user.closet.push(closet);
                user.save();
                res.status(201).json(user.closet);
            } else {
                res.status(403).json({
                    message: "sorry, but that user is not registered.",
                });
            }
        })
        .catch((err) => {
            console.log(err, "err");
        });
});

// * Put closet shoes
router.put("/:userId/:closetShoeId", (req, res) => {
    const { userId, closetShoeId } = req.params;
    const updatedShoe = req.body;

    User.findById(userId)
        .then((user) => {
            if (user) {
                let findShoeIndex = user.closet.findIndex((shoe) => shoe.shoeId === closetShoeId);
                user.closet[findShoeIndex] = updatedShoe;
                user.save();
                res.status(201).json(user.closet[findShoeIndex]);
            } else {
                res.status(404).json({ message: "Could not find task with given id" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to update scheme", err });
        });
});

// * Delete closet shoes
router.delete("/:userId/:closetShoeId", (req, res) => {
    const { userId, closetShoeId } = req.params;

    User.findById(userId)
        .then((user) => {
            if (user) {
                let findShoeIndex = user.closet.findIndex((shoe) => shoe.shoeId === closetShoeId);
                user.closet.splice(findShoeIndex, 1);
                user.save();
                res.status(200).json(user.closet);
            } else {
                res.status(404).json({ message: "Could not find task with given id" });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
