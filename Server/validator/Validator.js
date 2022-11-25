const jwt = require("jsonwebtoken");

const Validator = {
    TokenValidator: (req, res, next) => {
        jwt.verify(req.body.Token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) {
                return res.json({ message: "توکن وارد شده اشتباه است" });
            } else {
                if (decoded.UserID && decoded.Email) {
                    req.body.decoded = decoded;
                    next();
                } else {
                    return res.json({ message: "توکن وارد شده اشتباه است" });
                }
            }
        });
    },
};

module.exports = Validator;
