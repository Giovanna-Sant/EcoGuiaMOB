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
  await cache.set("dados",resposta.data.results[0][0]);
  const last =  await cache.get('lastLevel')
  const user = resposta.data.results[0][0]

  if(!last){
     await cache.set("lastLevel",user.XP_level)
   }
 

  if(user.XP_user > user.XP_level && last != user.XP_level ){
    await cache.set("lastLevel",user.XP_level)
    await updateLevel();

  }
  const info = await cache.get('hash')
  if(!info){
    checkInfos()
  }
}

export default getPerfil;