import  Axios  from "axios";

const api = Axios.create({
    baseURL:'http://192.168.1.40:3000'
});

export default api;