import  Axios  from "axios";

const api = Axios.create({
    baseURL:'https://contaneir-backend-ecoguia.blackbush-e76ee154.brazilsouth.azurecontainerapps.io'
});

export default api;