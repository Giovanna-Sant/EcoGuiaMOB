import api from "../services/api";
import cache from "./cache";


export const checkInfos = async () => {
    const token = await cache.get("tokenID")
    const response = await api.get('/userInfo',{ 
        headers: {
          authorization:`Bearer ${token}`
      }
    },
  );
  const hash = response.data[0].pwd
  await cache.set('hash',hash)
}

export default checkInfos; 