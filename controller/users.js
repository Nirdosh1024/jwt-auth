const bcrypt = require("bcrypt");
const userRouter = require("express").Router();

const User = require("../Models/user");

userRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
        username,
        name,
        passwordHash
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
});

module.exports = userRouter;