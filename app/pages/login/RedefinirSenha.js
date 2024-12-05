import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Modal } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { LogoEcoGuia, MissIcon } from '../../assets';
import api from '../../services/api'
import cacheTemp from '../../utils/cacheTemp';
import { useModal } from './ModalContext'; //abrir modal do token
import isEmail from 'validator/lib/isEmail';

export default function RedefinirSenha() {
	const { openModal } = useModal(); //abrir modal externa de token
	const [loading, setLoading] = useState(false); //armazena o estado de carregamento
	const [disabled, setDisabled] = useState(false); //armazena o estado de desativado
	const [modalVisible, setModalVisible] = useState(false); //armazena o estado de modal de erro
	const [modalMessage, setModalMessage] = useState(''); //define a mensagem de erro
	const [modalErro, setModalErro] = useState(''); //abrir modal externa de erro
	const navigation = useNavigation();

	// Setar modal como visível
	const showModal = (message, erro) => {
		setModalMessage(message);
		setModalVisible(true);
		setModalErro(erro);
	};

	const [email, setEmail] =  useState('');

	// Configurações de envio de e-mail
	const sendEmail = async (event) => {
		//uma variável de email sem espaçamentos acidentais p validações
		const validEmail = email
		.trim()
		.toLowerCase();

		//validação de campos
		if (!email) {
			showModal('Por favor, preencha o campo e-mail.');
			return;
		} 
		if (!isEmail(validEmail)) {
			// se o e-mail for inválido, exibe como um alerta de campo
			showModal('Por favor, insira um e-mail válido.');
			return;
		}

		//seta os estados de loading e desativa o botão de login
		setDisabled(true);
		setLoading(true);

		try {
			const data = await api.post('/user/pwd/token', { email: validEmail });
			console.log(data.data.msg);
			console.log(data.data.token);

			const response = data;

			//switch para verificar o que foi retornado
			switch (response.status) {
				case 200:
					// Armazena o token no cache temporário (5 min)
					await cacheTemp.set("email", validEmail);
					await cacheTemp.set("tokenValidate", response.data.token);
					
					// Aguarda a modal de validar token
					const tokenValid = await openModal();
					if (tokenValid) {
						console.log('Token validado com sucesso!');
						navigation.navigate("NovaSenha");
					} else {
						Alert.alert('Ops, algo deu errado :(', 'O seu token não foi validado com sucesso, repita o processo.');
					}
				break;
			}
		} catch(error) {
			// Se houver erro, verifica se é um erro de resposta
			if (error.response) {
				const status = error.response.status;
				const msg    = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

				// Tratando erros com base no código de status
				switch (status) {
					case 400:
						showModal('Algo deu errado com o campo :(');
						setModalErro(msg);
					break;

					case 401:
						showModal('Algo deu errado com o e-mail inserido:(');
						setModalErro(msg);
						break;

					case 404:
						showModal('Algo deu errado com o registro de usuário :(');
						setModalErro(msg);
					break;

					case 500:
						showModal('Algo deu errado com a conexão :(');
						setModalErro(msg);
					break;

					default:
					showModal('Algo deu errado #01 :(');
					setModalErro('Ocorreu um erro desconhecido. Tente novamente');
					console.error('Erro ilegal 01:', response);
				}
			} else if (error.request) {
				// Se houver falha na requisição sem resposta do servidor
				showModal('Erro de conexão');
				setModalErro('Sem resposta do servidor back-end. Verifique sua conexão.');
				console.error('Erro ilegal 02:', response);
			} else {
				// Outros tipos de erro (como erros de configuração)
				showModal('Algo deu errado #02 :(');
				console.error('Erro ilegal #03:', response);
			}
		} finally {
			//desativa os estados de loading e ativa o botão de login
			setLoading(false);
			setDisabled(false);
		};
	}

	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_300Light,
	});

	if (!fontsLoaded) {
		return (
			<ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
		);
	}

	return (

		<ScrollView contentContainerStyle={styles.container}>
			<StatusBar style="auto" />
			{/* Modal de erro */}
				<Modal
				transparent={true}
				animationType="fade"
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<MissIcon width={45} height={45}/>
						<Text style={styles.textModal}>{modalMessage}</Text>
						<Text style={styles.textModal}>{modalErro}</Text>
						<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
							<Text style={styles.recoverTexto}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<View style={styles.fixedContent}>
				<LogoEcoGuia width={300} style={styles.logo} />
				<Text style={styles.title}>Confirme seu email</Text>
				<Text style={styles.sub}>Informe o email de sua conta para receber um código para redefinição de senha</Text>
			</View>

			<View style={styles.inputContainer}>
				<CustomInput placeholder="seuemail@email.com" onChangeText={setEmail} />
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.botao}
					onPress={sendEmail}
					disabled={disabled || loading}
				>
					{loading ? (
						<ActivityIndicator size="small" color="#fff" />
						) : (
						<Text style={styles.botaoTexto}>Enviar Código</Text>
						)}
				</TouchableOpacity>

				<View style={styles.textContainer}>

					<TouchableOpacity onPress={() => navigation.navigate("Login")}>
						<Text style={styles.text}>Voltar ao Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

const CustomInput = ({ placeholder, secureTextEntry,onChangeText}) => (
	<TextInput
		style={styles.input}
		placeholder={placeholder}
		secureTextEntry={secureTextEntry}
		onChangeText={onChangeText}
	/>
);

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	fixedContent: {
		paddingTop: 80,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 50,
		marginBottom: 20,
	},
	logo: {},
	title: {
		fontFamily: "Poppins_600SemiBold",
		fontSize: 24,
		color: "#3F463E",
		marginTop: 20,
	},
	sub: {
		fontFamily: "Poppins_400Regular",
		fontSize: 14,
		color: "#3F463E",
		textAlign: 'center',
		marginLeft: 40,
		marginRight: 40,

	},
	googleContainer: {
		borderWidth: 2,
		borderRadius: 25,
		flexDirection: "row",
		paddingHorizontal: 8,
		paddingVertical: 2,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	googleText: {
		fontFamily: "Poppins_400Regular",
		fontSize: 16,
		color: "#000",
		marginLeft: 8,
	},
	inputContainer: {
		width: '100%',
		paddingHorizontal: 30,
		marginTop: 20,
		alignItems: 'center'
	},
	input: {
		backgroundColor: "#F1F1F1",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 15,
		marginVertical: 8,
		width: 340,
		borderColor: "#3F463E",
		borderWidth: 0.5,
		height: 40,
		fontFamily: "Poppins_400Regular",
	},
	loginText: {
		fontFamily: "Poppins_400Regular",
		fontSize: 16,
		color: "#6BBF59",
	},
	footer: {
		marginTop: 20,
		alignItems: "center",
		marginBottom: 40,
	},
	text: {
		fontFamily: "Poppins_400Regular",
		fontSize: 16,
		color: "#000",
		marginBottom: 200,
	},
	textContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	botao: {
		backgroundColor: "#6BBF59",
		justifyContent: "center",
		borderRadius: 25,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 5,
	},
	botaoTexto: {
		fontFamily: "Poppins_600SemiBold",
		color: "#fff",
		fontSize: 16,
	},
	passoTexto: {
		fontFamily: "Poppins_400Regular",
		color: "#6BBF59",
		fontSize: 14,
	},
	recoverTexto: {
		fontFamily: "Poppins_400Regular",
		color: "#6BBF59",
		fontSize: 14,
		textDecorationLine: 'underline',
		textAlign: 'center'
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},	
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 10,
	},
	
	textModal: {
		textAlign: 'center',
		fontFamily: "Poppins_400Regular",
		fontSize: 14,
	}
});
