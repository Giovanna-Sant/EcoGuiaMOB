import api from "../services/api";
import cache from "./cache";


export const getPerfil = async () => {
    const token = await cache.get("tokenID")
    const resposta = await api.get('/user/profile',{ 
        headers: {
          authorization:`Bearer ${token}`
      }
    },
  );
  await cache.set("dados",resposta.data.results[0][0]);
}

export default getPerfil;