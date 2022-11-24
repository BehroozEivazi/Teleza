const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    UserID: {
        type: String,
        required: true,
    },
    MemberCount: {
        type: Number,
        default: 100,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
