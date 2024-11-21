import  Axios  from "axios";

const api = Axios.create({
    baseURL:'http://10.105.81.36:3000',
    timeout: 5000
});

export default api;