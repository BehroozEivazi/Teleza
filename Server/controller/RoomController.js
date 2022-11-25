const Room = require("../model/Room");

const RoomController = {
    Create: async (req, res) => {
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
    GetRooms: async (req, res) => {
        try {
            let result = await Room.find({ UserID: req.body.UserID });
            return res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports.RoomController = RoomController;
