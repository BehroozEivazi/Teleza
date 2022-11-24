import { BASE_URL_API } from "../constant/routes";
import utils from "./utils";

class api {
    login(params) {
        let obj = {};
        obj.params = params;
        obj.url = BASE_URL_API + "api/login";
        obj.method = "POST";
        let res = utils.fetchData(obj);
        return res;
    }
}

export default api = new api();
