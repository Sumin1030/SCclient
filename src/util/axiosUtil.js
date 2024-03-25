import axios from "axios";
import apiUrl from "../util/apiUrl.json";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiUrl.add;

function axiosUtil(url) {
    axios.defaults.baseURL = apiUrl.add;
    // axios.defaults.baseURL = apiUrl.local;
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