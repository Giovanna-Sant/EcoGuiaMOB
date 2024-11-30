import api from "../services/api";
import cache from "./cache";
import getPerfil from "./gerProfile";

export const updateLevel = async () => {
	//capta o tokenID do cachê
    const tokenID  = await cache.get('tokenID')
    //chama a função de atualizar level 
    try {
        const data = await api.put(
            '/user/levelup', 
            { type: 1, xp_material: 0, peso: 0 }, 
            { headers: { Authorization: `Bearer ${tokenID}` } }
        );

    } catch(error) {
        // Se houver erro, verifica se é um erro de resposta
        if (error.response) {
            const status = error.response.status;
            const msg = error.response.data.msg;
            
            // Tratando erros com base no status
            switch (status) {
                case 500:
                conole.error(error)
                break;
                    
                default:
                   console.error('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
                    console.error('Erro no back-end:', response);
            }	
        } else if (error.request) {
            // Se houver falha na requisição sem resposta do servidor
            console.error('Erro de conexão', 'Sem resposta do servidor. Verifique sua conexão');
        } else {
            // Outros tipos de erro (como erros de configuração)
            console.error('Erro', 'Erro desconhecido');
            console.error('Erro na requisição:', error);
        }
    }
   await getPerfil() 
}

export default updateLevel;