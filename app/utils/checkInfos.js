import {Alert} from "react-native";
import api from "../services/api";
import cache from "./cache";

export default async function checkInfos(){
	try{
		const token    = await cache.get("tokenID");
		if(!token){
			Alert.alert('Ops! Algo deu errado', 'Não foi possível encontrar token de identificação, \n faça login novamente.')
			return;
		}

		const response = await api.get('/userInfo',{ 
				headers: {
					authorization:`Bearer ${token}`
				}
			},
		);
		const hash = response.data[0].pwd
		await cache.set('hash', hash);

		return;
	}catch(error){
		// Se houver erro, verifica se é um erro de resposta
		if (error.response) {
			const status = error.response.status;
			const msg = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

			// Tratando erros com base no código de status
			switch (status) {
				case 500:
					Alert.alert('Algo deu errado com a conexão :(', msg);
				break;

				default:
				Alert.alert('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
			}

			console.error('Erro ilegal: checkInfos #01', error);
		} else if (error.request) {
			// Se houver falha na requisição sem resposta do servidor
			Alert.alert('Erro de conexão', `Sem resposta do servidor. \n Verifique sua conexão`);

			console.error('Erro ilegal: checkInfos #02', error);
		} else {
			// Outros tipos de erro (como erros de configuração)
			Alert.alert('Erro', 'Erro desconhecido');
			console.error('Erro ilegal: checkInfos #03', error);
		}

		return;
	}
}