import  Axios  from "axios";

const api = Axios.create({
    baseURL:'http://172.16.1.227:3000',
    timeout: 5000
});

export default api;