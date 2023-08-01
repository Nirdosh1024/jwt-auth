const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String
});

UserSchema.set("toJSON", {
    transform: (document, retObj) => {
        retObj.id = retObj._id.toString();
        delete retObj._id;
        delete retObj.__v;
        delete retObj.passwordHash;
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;