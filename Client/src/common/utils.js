import axios from "axios";
import qs from "qs";
class utils {
    userInfo() {
        let usertoken = localStorage.getItem("usertoken");
        let user = {
            id: -1,
            isLogin: false,
            token: null,
            name: null,
            lastName: null,
            userType: 2,
            fullName: null,
        };
        if (usertoken) {
            user.id = usertoken.ID;
            user.isLogin = true;
            user.token = usertoken.Token;
            user.fullName = `${usertoken.Name} ${usertoken.LastName}`;
            user.name = usertoken.Name;
            user.lastName = usertoken.LastName;
        }
        return user;
    }

    async fetchData(filterObj) {
        try {
            const options = {
                method: filterObj.method,
                headers: { "content-type": "application/x-www-form-urlencoded" },
                data: qs.stringify(filterObj.params),
                url: filterObj.url,
            };
            let response = await axios(options);
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default utils = new utils();
