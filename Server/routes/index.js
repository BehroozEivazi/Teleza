const express = require("express");

const { UserController } = require("../controller/UserController");
const { RoomController } = require("../controller/RoomController");
const Validator = require("../validator/Validator");

const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);

router.post("/room-create", Validator.TokenValidator, RoomController.create);
router.post("/rooms", Validator.TokenValidator, RoomController.getRooms);
router.post("/room-add-user", Validator.TokenValidator, RoomController.addUserTooRoom);
router.post("/room-remove-user", Validator.TokenValidator, RoomController.removeUserFromRoom);
router.post("/room-joined", Validator.TokenValidator, RoomController.joinedRooms);

module.exports = router;
