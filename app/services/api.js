import  Axios  from "axios";

const api = Axios.create({
    baseURL:'http://192.168.1.46:3000',
    timeout: 5000
});

export default api;