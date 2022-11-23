const express = require("express");
const path = require("path");
const rootDir = require("./path");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;

class utils {
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    signToken(obj) {
        try {
            let token = jwt.sign(obj, process.env.SECRET_JWT, {
                expiresIn: "360h",
            });
            return token;
        } catch (error) {
            return error;
        }
    }

    multerConfig() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "./public/uploads/images");
            },
            filename: (req, file, cb) => {
                cb(null, `${uuid()}_${file.originalname}`);
            },
        });

        const fileFilter = (req, file, cb) => {
            if (file.mimetype == "image/png") {
                cb(null, true);
            } else {
                cb("file kososhere", false);
            }
        };
        return {
            storage,
            fileFilter,
        };
    }
}

module.exports = new utils();
