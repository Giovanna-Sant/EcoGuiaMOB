import  Axios  from "axios";

const api = Axios.create({
    baseURL:'http://172.16.3.170:3000'
});

export default api;