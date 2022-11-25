const express = require("express");

const { UserController } = require("../controller/UserController");
const { RoomController } = require("../controller/RoomController");
const Validator = require("../validator/Validator");

const router = express.Router();

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);

router.post("/room-create", Validator.TokenValidator, RoomController.Create);
router.post("/rooms", Validator.TokenValidator, RoomController.GetRooms);

module.exports = router;
