const User = require("../model/User");
const utils = require("../common/utils");
const { Transform } = require("./transform/ResultTransform");
exports.UserController = {
    Register: async (req, res) => {
        try {
            req.body.Password = await utils.hashPassword(req.body.Password);
            let user = await User.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({
                message: "ثبت نام شما با خطا مواجه شد",
            });
        }
    },

    Login: async (req, res) => {
        try {
            let result = await User.findOne({ Email: req.body.Email }).exec();
            let isValid = await utils.comparePassword(req.body.Password, result.Password);
            if (isValid) {
                let user = Transform.userTransform(result);
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "رمز عبور کصشر نزن حاجی" });
            }
        } catch (error) {
            res.status(404).json({ message: "ورود شما با خطا مواجه شد" });
        }
    },
};
