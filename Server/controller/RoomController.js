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
            res.status(400).json({
                message: "ایجاد اتاق با خطا مواجه شد",
            });
        }
    },
};

module.exports.RoomController = RoomController;
