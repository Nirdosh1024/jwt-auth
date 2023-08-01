const express = require("express");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(config.MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => logger.info("Connected to DB")).catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./controller/users"));
app.use("/api/login", require("./controller/login"));

module.exports = app;