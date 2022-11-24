const utils = require("../../common/utils");

class Transform {
    userTransform(user) {
        let obj = {};
        obj.ID = user._id;
        obj.Name = user.Name;
        obj.LastName = user.LastName;
        obj.Email = user.Email;
        obj.Token = utils.signToken({ id: user._id, fullName: `${user.Name} ${user.LastName}` });
        return obj;
    }
}

module.exports.Transform = new Transform();
