import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Modal } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { LogoEcoGuia, Google, MissIcon, ErrorIcon } from '../../assets';
import api from '../../services/api';
import cache from '../../utils/cache';
import validator from 'validator';	// biblioteca que verifica o formato do e-mail
import checkPwd from '../../utils/checkPwd'; // verificação de senha válida

export default function Login() {
	const [isVisible, 		  setIsVisible] = useState(true);
	const [nome,   	  			     setNome] = useState('');
	const [sobrenome, 		  setSobrenome] = useState('');
	const [email_cad,    	   setEmailCad] = useState('');
	const [pwd_cad,   		   setSenhaCad] = useState('')
	const [pwd_cadcheck,   setSenhaCheck] = useState('');;
	const [email, 	  			    setEmail] = useState('');
	const [pwd,  	  			      setSenha] = useState('');
	const [loading,  		      setLoading] = useState(false);
	const [disabled,         setDisabled] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	// Setar modal como visível ou não
	const showModal = (message) => {
		setModalMessage(message);
		setModalVisible(true);
	};

	const login = async (event) => {
		event.preventDefault();

		//uma variável de email sem espaçamentos acidentais p validações
		const validEmail = email.trim();

		//função para validar se o campo de e-mail foi preenchido corretamente
		const isEmailValid = (email) => {
			return validator.isEmail(email);
		};

		//validação de campos
		if (!email || !pwd) {
			showModal('Por favor, preencha todos os campos');
			return;
		} else if (!isEmailValid(validEmail)) {
			// se o e-mail for inválido, exibe como um alerta de campo
			showModal('Por favor, insira um e-mail válido');
			return;
		} else if (pwd.length < 8) {
			// se a senha for inválida, exibe como um alerta de campo
			showModal('Por favor, insira uma senha válida');
			return;
		}

		//seta os estados de loading e desativa o botão de login
		setDisabled(true);
		setLoading(true);

		try {
			//define um limite para o tempo de espera de 5 segundos
			const controller = new AbortController();
			const timeout	 = setTimeout(() => controller.abort(), 5000);

			const data = await api.post('/user/login', {email, pwd});
			console.log(data.data.msg);
			console.log(data.data.token);

			//caso a requisição seja atendida, desativa o timeout
			clearTimeout(timeout);

			const response = data;

			//switch para verificar o que foi retornado
			switch (response.status) {
				case 200:
					// Armazena o token e o email no cache
					await cache.set("tokenID", response.data.token);
					await cache.set("email", email);
					
					// Redireciona para a página Home
					handlePress("Home");
				break;
			}
		} catch(error) {
			// Se houver erro, verifica se é um erro de resposta
			if (error.response) {
				const status = error.response.status;
				const msg = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

				// Tratando erros com base no código de status
				switch (status) {
					case 422:
						showModal('Algo deu errado com os campos :(', msg);
					break;

					case 404:
						showModal('Algo deu errado com o usuário :(', msg);
					break;

					case 400:
						showModal('Algo deu errado com a senha :(',   msg);
					break;

					case 500:
						showModal('Algo deu errado com a conexão :(', msg);
					break;

					default:
					showModal('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
					console.error('Erro ilegal:', response);
				}
			} else if (error.request) {
				// Se houver falha na requisição sem resposta do servidor
				showModal('Erro de conexão', 'Sem resposta do servidor. Verifique sua conexão');
			} else {
				// Outros tipos de erro (como erros de configuração)
				showModal('Erro', 'Erro desconhecido');
			}
		} finally {
			//desativa os estados de loading e ativa o botão de login
			setLoading(false);
			setDisabled(false);
		};
	}

	const cadastro = async (event) => {
		event.preventDefault();

		//uma variável de email sem espaçamentos acidentais p validações
		const validEmail = email_cad.trim();

		//função para validar se o campo de e-mail foi preenchido corretamente
		const isEmailValid = (email) => {
			return validator.isEmail(email);
		};
		
		// chama função para verificar senha
		const verificate = checkPwd(pwd_cad);

		//validação de campos (Dá MUITO p/ melhorar essa validação com useEffect)
		if (!nome || !sobrenome || !email_cad || !pwd_cad || !pwd_cadcheck){
			showModal('Por favor, preencha todos os campos');
			return;
		} else if (!isEmailValid(validEmail)) {
			// se o e-mail for inválido, exibe como um alerta de campo
			showModal('Por favor, insira um e-mail válido');
			return;
		} else if (verificate[0] == false) {
			const msg = verificate[1];
			// se a senha for inválida, exibe como um alerta de campo
			showModal(msg);
			return;
		} else if (pwd_cad != pwd_cadcheck) {
			// compara se os campos de senha batem
			showModal('As senhas não batem');
			return;
		};

		setDisabled(true);
		setLoading(true);

		try {
			const avatar = 1;
			const data = await api.post('/user/register', {name: nome, lastname: sobrenome, email: email_cad, pwd: pwd_cad, avatar});
			const response = data;

			//switch para verificar o que foi retornado
			switch (response.status) {
				case 200:
					const msg = response.data.msg;

					// Armazena o token e o email no cache
					cache.set("name",    nome);
					cache.set("lastname",sobrenome);
					cache.set("email",   email_cad);
					cache.set("pwd",     pwd_cad);
					cache.set("avatar",  avatar);
					
					showModal('Token de validação', msg);
				break;
			}
		} catch(error) {
			// Se houver erro, verifica se é um erro de resposta
			if (error.response) {
				const status = error.response.status;
				const msg = error.response.data.msg;

				// Tratando erros com base no status
				switch (status) {
					case 424:
						showModal('Algo deu errado com os campos :(', msg);
					break;

					case 423:
						showModal('Algo deu errado com o email :(', msg);
					break;

					case 422:
						showModal('E-mail já está em uso :(', msg);
					break;

					case 400:
						showModal('Algo deu errado com a senha :(',   msg);
					break;

					case 500:
						showModal('Algo deu errado com a conexão :(', msg);
					break;

					default:
					showModal('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
					console.error('Erro no back-end:', response);
				}
			} else if (error.request) {
				// Se houver falha na requisição sem resposta do servidor
				showModal('Erro de conexão', 'Sem resposta do servidor. Verifique sua conexão');
			} else {
				// Outros tipos de erro (como erros de configuração)
				showModal('Erro', 'Erro desconhecido');
				console.error('Erro na requisição:', error);
			}
		} finally {
			//desativa os estados de loading e ativa o botão de login
			setLoading(false);
			setDisabled(false);
		}
	};

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const navigation = useNavigation();
	const handlePress = (screen) => {
		navigation.navigate(screen);
	};

	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
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
						<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
							<Text style={styles.recoverTexto}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{isVisible ? (
			// Login Content
			<View style={styles.fixedContent}>
				<LogoEcoGuia width={300} style={styles.logo} />
				<Text style={styles.title}>Login</Text>

				{/* <View style={styles.googleContainer}>
				<Google width={25} height={25} />
				<Text style={styles.googleText}>Entrar com o Google</Text>
				</View> */}

				<View style={styles.inputContainer}>
					<CustomInput placeholder="seuemail@email.com" onChangeText={setEmail} />
					<CustomInput placeholder="suasenha" secureTextEntry onChangeText={setSenha}/>
					<TouchableOpacity
						style={styles.recover}
						onPress={() => handlePress("RedefinirSenha")}
						>
						<Text style={styles.recoverTexto}>Esqueci a senha</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.footer}>
					<TouchableOpacity
						style={styles.botao}
						onPress={login}
						disabled={disabled || loading}
					>
						{loading ? (
						<ActivityIndicator size="small" color="#fff" />
						) : (
						<Text style={styles.botaoTexto}>Entrar</Text>
						)}
					</TouchableOpacity>

					<View style={styles.textContainer}>
						<Text style={styles.text}>Ainda não possui uma conta?</Text>
						<TouchableOpacity onPress={toggleVisibility}>
							<Text style={styles.loginText}>Realizar cadastro</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			) : (
			// Cadastro Content
			<View style={styles.fixedContent}>
				<LogoEcoGuia width={300} style={styles.logo} />
				<Text style={styles.title}>Cadastro</Text>

				{/* <View style={styles.googleContainer}>
					<Google width={25} height={25} />
					<Text style={styles.googleText}>Criar conta com o Google</Text>
				</View> */}

				<View style={styles.inputContainer}>
					<CustomInput placeholder="Nome" 		       onChangeText={setNome}/>
					<CustomInput placeholder="Sobrenome" 		   onChangeText={setSobrenome}/>
					<CustomInput placeholder="seuemail@email.com"  onChangeText={setEmailCad}/>
					<CustomInput placeholder="Senha" 		   	   onChangeText={setSenhaCad}   secureTextEntry />
					<CustomInput placeholder="Confirmar senha"     onChangeText={setSenhaCheck} secureTextEntry />
				</View>

				<View style={styles.footer}>
					<TouchableOpacity
						style={styles.botao}
						onPress={cadastro}
						disabled={disabled || loading}
					>
						{loading ? (
						<ActivityIndicator size="small" color="#fff" />
						) : (
						<Text style={styles.botaoTexto}>Cadastrar</Text>
						)}
					</TouchableOpacity>

					<View style={styles.textContainer}>
						<Text style={styles.text}>Já possui uma conta?</Text>
						<TouchableOpacity onPress={toggleVisibility}>
						<Text style={styles.loginText}>Realizar login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			)}
		</ScrollView>
	);
}

const CustomInput = ({ placeholder, secureTextEntry, onChangeText }) => (
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
		justifyContent: "space-around",
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

	logo: {
		marginBottom: 20
	},

	title: {
		fontFamily: "Poppins_600SemiBold",
		fontSize: 24,
		color: "#3F463E",
		marginTop: 20,
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
		paddingLeft: 5,
		textDecorationLine: 'underline',
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
		textAlign: 'center'
	},

	textContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		bottom: -60,
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
		marginTop: 20
	},

	botaoTexto: {
		fontFamily: "Poppins_600SemiBold",
		color: "#fff",
		fontSize: 16,
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
		marginVertical: 5
	  }
});