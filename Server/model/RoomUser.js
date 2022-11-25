const mongoose = require("mongoose");

const RoomUserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
    },
    Room: {
        type: String,
        required: true,
    },
    Admin: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const RoomUsers = mongoose.model("RoomUser", RoomUserSchema);
module.exports = RoomUsers;
