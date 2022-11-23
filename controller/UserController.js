const User = require("../model/User");
const utils = require("../common/utils");
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
            let user = await User.findOne({ Email: req.body.Email });
            let isValid = await utils.comparePassword(req.body.Password, user.Password);
            if (isValid) {
                let result = utils.signToken({ id: user._id });
                user.Token = result;
                let val = Object.assign(
                    {
                        Token: result,
                    },
                    user
                );
                res.status(200).json(val);
            } else {
                res.status(404).json({ message: "رمز عبور کصشر نزن حاجی" });
            }
        } catch (error) {
            res.status(404).json({ message: "ورود شما با خطا مواجه شد" });
        }
    },
};
