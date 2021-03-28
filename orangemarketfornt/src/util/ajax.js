/* 引入Axios */
import axios from 'axios'

const $ = axios.create({
    baseURL: "/",
    timeout: 1000,
    withCredentials: false
});
axios.defaults.withCredentials = false;
export { $ };
