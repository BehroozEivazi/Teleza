const utils = require("../../common/utils");

class Transform {
    userTransform(user) {
        let obj = {};
        obj.ID = user._id;
        obj.Name = user.Name;
        obj.LastName = user.LastName;
        obj.Email = user.Email;
        obj.Token = utils.signToken({
            UserID: user._id,
            Email: user.Email,
            fullName: `${user.Name} ${user.LastName}`,
        });
        return obj;
    }

    roomJoinedTransform(rooms) {
        let arr = [];
        rooms.forEach((el) => {
            arr.push({
                _id: el._id,
                Email: el.Email,
                Room: el.Room,
            });
        });
        return arr;
    }
}

module.exports.Transform = new Transform();
