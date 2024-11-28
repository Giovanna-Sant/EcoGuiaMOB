import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput, ActivityIndicator, Modal, Alert } from 'react-native';
import { useModal }  from './ModalContext'; // Importe o contexto
import { CheckToken} from '../../assets';
import cacheTemp from '../../utils/cacheTemp';

const CustomModal = () => {
	const { isModalVisible, closeModal }  = useModal();
	const [token, 		 setToken]	      = useState('');
	const [loading,      setLoading]  	  = useState(false);
	const [disabled,     setDisabled] 	  = useState(false);

	// Configurações de checagem de token
	const checkToken = async () => {
		//uma variável de token formatado p validações
		const validToken = token
		.trim()
		.toLowerCase();

		//validação de campos
		if (!token) {
			Alert.alert('Pera pera aí!','Por favor, preencha o campo.');
			return;
		} 
		if (validToken.length < 4) {
			// se o e-mail for inválido, exibe como um alerta de campo
			Alert.alert('Ops!', 'Por favor, insira um token válido de 4 dígitos.');
			return;
		}

		//seta os estados de loading e desativa o botão de login
		setDisabled(true);
		setLoading(true);

		try{
			//variável responsável por carregar o token
			const cacheToken = await cacheTemp.get('tokenValidate');

			//verifica se existe um token no cachê temporário (5 min)
			if (!cacheToken){
				Alert.alert('Algo deu errado', 'Não existe token armazenado.');
				return;
			}

			//valida o token inserido pelo usuário
			if(validToken === cacheToken){
				//token válido
				//fecha a modal e resolve a Promise com sucesso
				closeModal(true);
			}else{
				//token inválido
				Alert.alert('Token inválido', 'Por favor, tente novamente.');
				//fecha a modal e resolve a Promise com erro
				closeModal(false);
			};
		}catch(error){
			Alert.alert('Erro', 'Ocorreu um erro durante a validação.');
			console.error(error);
		} finally {
			setLoading(false);
			setDisabled(false);
		};
	};

	return (
		<Modal
			visible={isModalVisible}
			transparent
			animationType="fade"
			onRequestClose={() => closeModal(false)}
		>
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
				<CheckToken width={45} height={45}/>
					<Text style={styles.modalText}>Código de Verificação</Text>
					<Text style={styles.modalInfo}>Insira o código que foi enviado para seu email para concluir a ação</Text>
					<View style={styles.inputView}>
						<TextInput
							placeholder="****"
							value={token}
							onChangeText={setToken} 
							maxLength={4}
							style={styles.textInput}
						/>
					</View>
					<Pressable 
						style={styles.botao} 
						onPress={checkToken}
						disabled={disabled || loading}
					>
						{loading ? (
						<ActivityIndicator size="small" color="#fff" />
						) : (
						<Text style={styles.botaoTexto}>Verificar</Text>
						)}
					</Pressable>

					<Pressable onPress={() => closeModal(false)} disabled={loading}>
						<Text style={styles.recoverTexto}>Voltar</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},

	modalContainer: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},

	modalText: {
		fontFamily: "Poppins_600SemiBold",
		fontSize: 18,
		color: "#3F463E",
		marginTop: 8,
	},

	botao: {
		backgroundColor: "#6BBF59",
		justifyContent: "center",
		borderRadius: 25,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginVertical: 8,
	},

	botaoTexto: {
		fontFamily: "Poppins_600SemiBold",
		color: "#fff",
		fontSize: 16,
	},

	inputView: {
		backgroundColor: "#F1F1F1",
		height: 40,
		paddingHorizontal: 10,
		borderRadius: 15,
		marginVertical: 8,
		borderColor: "#3F463E",
		borderWidth: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	textInput: {
		width: '80%',
		height: 50,
		fontFamily: "Poppins_400Regular",
		alignItems: 'center'
	},

	modalInfo: {
		width: 295,
		height: 50,
		fontFamily: "Poppins_400Regular",
		textAlign: 'center'
	},

	recoverTexto: {
		fontFamily: "Poppins_400Regular",
		color: "#6BBF59",
		fontSize: 14,
		textDecorationLine: 'underline',
		textAlign: 'center'
	},
});

export default CustomModal;