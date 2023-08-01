const express = require("express");
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username: username });
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if(!(user && passwordCorrect)) {
        return res.status(401).json({
            error: "username or password invalid"
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 });
    res.status(200).send({ token, username: user.username, name: user.name });
});

const getTokenFrom = request => {
    const authorization = request.headers.authorization;
    if(authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
}


loginRouter.post("/protected-route", async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

    if(!decodedToken.id) {
        return res.status(401).json({ error: "Invalid Token" });
    }
    const user = await User.findById(decodedToken.id);
    res.send({ username: user.name, greeting: "Welcome" });
})

module.exports = loginRouter;