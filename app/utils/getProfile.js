import api from "../services/api";
import cache from "./cache";
import checkInfos from "./checkInfos";
import updateLevel from "./updateLevel";

export const getPerfil = async () => {
    const token = await cache.get("tokenID")
    const resposta = await api.get('/user/profile',{ 
        headers: {
          authorization:`Bearer ${token}`
      }
    },
  );
  await cache.set("dados", resposta.data.results[0][0]);

  const user = resposta.data.results[0][0]
  if(user.XP_user > user.XP_level){
    await updateLevel();
    await getPerfil();
  }
  
  const info = await cache.get('hash')
  if(!info){
    checkInfos()
  }
}

export default getPerfil;