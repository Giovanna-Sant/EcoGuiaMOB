import  Axios  from "axios";

const api = Axios.create({
    baseURL:'https://contaneir-backend-ecoguia.blackbush-e76ee154.brazilsouth.azurecontainerapps.io/',
    timeout: 5000
});

export default api;