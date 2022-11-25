const Room = require("../model/Room");
const RoomUsers = require("../model/RoomUser");
const { Transform } = require("./transform/ResultTransform");

const RoomController = {
    create: async (req, res) => {
        try {
            let room = await Room.create(req.body);
            if (room) {
                res.status(200).json(room);
            } else {
                res.status(400).json({
                    message: "ایجاد اتاق با خطا مواجه شد",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    getRooms: async (req, res) => {
        try {
            let result = await Room.find({ UserID: req.body.decoded.UserID });
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    },
    addUserTooRoom: async (req, res) => {
        try {
            let room = await Room.find({
                _id: req.body.ID,
                UserID: req.body.decoded.UserID,
            });
            if (room) {
                let rmus = await RoomUsers.create({
                    Room: req.body.ID,
                    Email: req.body.Email,
                    Admin: req.body.decoded.UserID,
                });
                if (rmus) {
                    res.status(200).json(rmus);
                } else {
                    res.status(200).json({
                        message: "ثبت با خطا مواجه شد",
                    });
                }
            } else {
                res.json({
                    message: "کاربر گرامی اتاقی یافت نشد",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    removeUserFromRoom: async (req, res) => {
        try {
            let rmus = await RoomUsers.findOneAndDelete({
                Admin: req.body.decoded.UserID,
                Email: req.body.Email,
                Room: req.body.ID,
            });
            if (rmus) {
                res.json(rmus);
            } else {
                res.json({
                    message: "حذف کاربر با خطا مواجه شد",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    joinedRooms: async (req, res) => {
        try {
            let rooms = await RoomUsers.find().or([
                { Email: req.body.decoded.Email },
                { Admin: req.body.decoded.UserID },
            ]);
            rooms = Transform.roomJoinedTransform(rooms);
            res.json(rooms);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports.RoomController = RoomController;
