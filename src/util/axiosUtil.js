import axios from "axios";
import config from "../config";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.url;

function axiosUtil(url) {
    // axios.defaults.baseURL = config.url;
    return axios;
}

function get(url) {
    axios.get(url).then((res) => {
      });
}

function post(url, info) {
    axios.post(url, info).then((res) => {
    });
}

export default axios;