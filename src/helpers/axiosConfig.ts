import axios from "axios";
import {API} from "../static";

const axiosInstance = axios.create({
    baseURL: API,
    timeout: 5000,
});

axiosInstance.interceptors.response.use(
    (res) => {
        return res.data;
    },
    async (err) => {
        return Promise.reject(err);
    },
);

export default axiosInstance;