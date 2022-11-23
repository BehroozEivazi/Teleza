const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    LastName: {
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
