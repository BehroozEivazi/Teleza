const jwt = require("jsonwebtoken");

const Validator = {
    TokenValidator: (req, res, next) => {
        jwt.verify(req.body.Token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) return res.json({ message: "توکن وارد شده اشتباه است" });
            req.body.UserID = decoded.id;
            next();
        });
    },
};

module.exports = Validator;
