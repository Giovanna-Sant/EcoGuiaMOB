import Axios from 'axios';

exports.getConnection = async () => {
    try{
        const API = Axios.create({
            baseURL: 'https:/172.16.2.54:3000/'
        });

        return API;
    }catch(error){
        console.error('Erro ao conectar: ' + error.stack);
        throw error;
    }
}