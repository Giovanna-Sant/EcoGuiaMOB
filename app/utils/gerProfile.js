import api from "../services/api";
import cache from "./cache";
import checkInfos from "./checkInfos";

export const getPerfil = async () => {
    const token = await cache.get("tokenID")
    const resposta = await api.get('/user/profile',{ 
        headers: {
          authorization:`Bearer ${token}`
      }
    },
  );
  await cache.set("dados",resposta.data.results[0][0]);

  const info = await cache.get('hash')
  if(!info){
    checkInfos()
  }
}

export default getPerfil;