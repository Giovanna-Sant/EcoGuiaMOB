//bibliotecas nativas
import React, { useState } 	from 'react';					  // biblioteca React
import { useNavigation } 	from '@react-navigation/native';  // navegação de páginas
import { StatusBar } 		from 'expo-status-bar';           // componente de barra
import { isEmail   }	 	from 'validator'; 	  			  // função de validar e-mail

//biblioteca Native
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Modal } from "react-native";

//importação de fontes 
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';  

//funções e configurações externas
import { LogoEcoGuia, MissIcon, ShowPassword, HidePassword } from '../../assets'; // importação de imagens
import { useModal } from './ModalContext'; 	      // configuração de Modal Token
import api 		    from '../../services/api';    // configuração de conexão com a API através de Axios e DotEnv
import checkPwd 	from '../../utils/checkPwd';  // verificação de senha válida
import cache 		from '../../utils/cache';     // cachê de 30 minutos
import cacheTemp 	from '../../utils/cacheTemp'; // cachê temporário de 5 minutos

//função de página react native
export default function Login() {
	//variáveis com mudança de estado 				(alteradas por funções ou chamadas)
	const [isVisible, 		 setIsVisible] 		  = useState(true);
	const [loading, 		 setLoading] 		  = useState(false);
	const [disabled, 		 setDisabled] 		  = useState(false);
	const [modalVisible,	 setModalVisible] 	  = useState(false);
	const [passwordVisible,  setPasswordVisible]  = useState(false);
	const [passwordVisible1, setPasswordVisible1] = useState(false);

	//variáveis que aceitam valores posteriormente  (alteradas por funções ou chamadas)
	const [nome, setNome] = useState('');
	const [sobrenome, setSobrenome] = useState('');
	const [email_cad, setEmailCad] = useState('');
	const [pwd_cad, setSenhaCad] = useState('')
	const [pwd_cadcheck, setSenhaCheck] = useState('');;
	const [email, setEmail] = useState('');
	const [pwd, setSenha] = useState('');
	const [modalMessage, setModalMessage] = useState('');
	const [modalErro, setModalErro] = useState('');

	//variável responsável pelo chamado de Modal Token
	const { openModal } = useModal();

	//variável de configuração de modais de mensagem e erro
	const showModal = (message, erro) => {
		setModalMessage(message);
		setModalVisible(true);
		setModalErro(erro);
	};

	//variáveis de configuração de campo vísivel ou não
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};
	const togglePasswordVisibility1 = () => {
		setPasswordVisible1(!passwordVisible1);
	};

	//função de login
	const login = async () => {
		//uma variável de email sem espaçamentos acidentais p validações
		let validEmail;

		//verifica se o chamado é direto de cadastro
		if(email_cad && pwd_cad){
			validEmail = email_cad
			.trim()
			.toLowerCase();
		}else{
		//caso contrário, procede normalmente
			validEmail = email
			.trim()
			.toLowerCase();

			//validação de campos
			if ((!email || !pwd)) {
				showModal();
				setModalMessage('Por favor, preencha todos os campos');
				return;
			} else if (!isEmail(validEmail)) {
				// se o e-mail for inválido, exibe como um alerta de campo
				showModal();
				setModalMessage('Por favor, insira um e-mail válido');
				return;
			} else if (pwd.length < 8) {
				// se a senha for inválida, exibe como um alerta de campo
				showModal();
				setModalMessage('Formato de senha inválido');
				return;
			}
		};

		//seta os estados de loading e desativa o botão de login
		setDisabled(true);
		setLoading(true);

		try{
			//estado variável de dados de requisição
			let response;

			//verifica se o chamado é direto do cadastro
			if(email_cad && pwd_cad){
				response = await api.post('/user/login', {email: email_cad, pwd: pwd_cad});
				console.log(response.data.msg);
			}else{
			//caso contrário, procede normalmente
				response = await api.post('/user/login', {email, pwd});
				console.log(response.data.msg);
			}
			
			const data = response;

			//switch para verificar o que foi retornado
			switch (data.status) {
				case 200:
					//armazena o token e o email no cachê
					await cache.set("tokenID", data.data.token);
					await cache.set("email",   email);
					
					//redireciona para a página 'Home'
					handlePress("Home");
				break;
			}
		}catch(error) {
			// Se houver erro, verifica se é um erro de resposta
			if (error.response) {
				const status = error.response.status;
				const msg    = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

				// Tratando erros com base no código de status
				switch (status) {
					case 422:
						showModal('Algo deu errado :(');
						setModalErro(msg);
					break;

					case 404:
						showModal('Algo deu errado :(');
						setModalErro(msg);
						break;

					case 400:
						showModal('Algo deu errado :(');
						setModalErro(msg);
					break;

					case 500:
						showModal('Algo deu errado :(');
						setModalErro(msg);
					break;

					default:
					showModal('Algo deu errado :(');
					setModalErro('Ocorreu um erro desconhecido. Tente novamente');
					console.error('Erro ilegal #01:', response);
				}
			} else if (error.request) {
				// Se houver falha na requisição sem resposta do servidor
				showModal('Erro de conexão :(');
				setModalErro('Sem resposta do servidor. Verifique sua conexão');
				console.error('Erro ilegal #02:', response);
			} else {
				// Outros tipos de erro (como erros de configuração)
				showModal('Erro :(');
				setModalErro('Erro desconhecido.');
				console.error('Erro ilegal #03:', response);
			}
		} finally {
			//desativa os estados de loading e ativa o botão de login
			setLoading(false);
			setDisabled(false);
		};
	}

	//função de cadastro
	const cadastro = async () => {
		//uma variável de email sem espaçamentos acidentais p validações
		const validEmail = email_cad
   		.trim()
    	.toLowerCase();
		
		// chama função para verificar senha
		const verificate = checkPwd(pwd_cad);

		//validação de campos
		if (!nome || !sobrenome || !email_cad || !pwd_cad || !pwd_cadcheck){
			showModal('Por favor, preencha todos os campos');
			return;
		} else if (!isEmail(validEmail)) {
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
			const data   = await api.post('/user/register', {name: nome, lastname: sobrenome, email: validEmail, pwd: pwd_cad, avatar});
			console.log(data.data.msg);
			console.log(data.data.token);

			const response = data;

			//switch para verificar o que foi retornado
			switch (response.status) {
				case 200:
					// Armazena o token (5 min)
					await cacheTemp.set("tokenValidate", response.data.token);

					// Aguarda a modal de validar token
					const tokenValid = await openModal();
					if (tokenValid) {
						console.log('Token validado com sucesso!');

						try{
							const data     = await api.post('/user/create', {name: nome, lastname: sobrenome, email: validEmail, pwd: pwd_cad, avatar});
							console.log(data.data.msg);
							console.log(data.data.token);

							const response = data;
							//switch para verificar o que foi retornado
							switch (response.status) {
								case 200:
									login();
								break;
							};
						}catch(error){
							// Se houver erro, verifica se é um erro de resposta
							if (error.response) {
								const status = error.response.status;
								const msg = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

								// Tratando erros com base no código de status
								switch (status) {
									case 400:
										showModal('Algo deu errado :(',   msg);
										setModalErro(msg);
									break;

									case 500:
										showModal('Algo deu errado com a conexão :(', msg);
										setModalErro(msg);
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
					} else {
						//desativa os estados de loading e ativa o botão de login
						setLoading(false);
						setDisabled(false);

						showModal('Ops, algo deu errado :( \n O seu token não foi validado com sucesso, repita o processo.');
					}
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
						showModal(msg);
					break;

					case 400:
						showModal(msg);
					break;

					case 500:
						showModal(msg);
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
						<Text style={styles.textModal}>{modalErro}</Text>
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

				<View style={styles.inputContainer}>
					<CustomInput placeholder="seuemail@email.com" onChangeText={setEmail} />
					<View style={styles.inputView}>
						<TextInput placeholder="suasenha123" onChangeText={setSenha} secureTextEntry={!passwordVisible} style={styles.textInput}/>
						<TouchableOpacity onPress={togglePasswordVisibility}>
							{passwordVisible ? <HidePassword width={24} height={24} /> : <ShowPassword width={24} height={24} />}
						</TouchableOpacity>
					</View>

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

				<View style={styles.inputContainer}>
					<CustomInput placeholder="Nome" 		       onChangeText={setNome}/>
					<CustomInput placeholder="Sobrenome" 		   onChangeText={setSobrenome}/>
					<CustomInput placeholder="Seuemail@email.com"  onChangeText={setEmailCad}/>
					<View style={styles.inputView}>
						<TextInput 
							placeholder="Senha" 
							onChangeText={setSenhaCad}
							secureTextEntry={!passwordVisible}
							style={styles.textInput}
						/>
						<TouchableOpacity onPress={togglePasswordVisibility}>
							{passwordVisible ? <HidePassword width={24} height={24} /> : <ShowPassword width={24} height={24} />}
						</TouchableOpacity>
					</View>
					
					<View style={styles.inputView}>
						<TextInput
							placeholder="Confirmar senha"     
							onChangeText={setSenhaCheck} 
							secureTextEntry={!passwordVisible1}
							style={styles.textInput}
						/>
						<TouchableOpacity onPress={togglePasswordVisibility1}>
							{passwordVisible1 ? <HidePassword width={24} height={24} /> : <ShowPassword width={24} height={24} />}
						</TouchableOpacity>
					</View>
				</View>

				{/* Implementação da modal, caso precise trazer algum parametro, adicionar */}
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
		width: 295,
    	height: 50,
		fontFamily: "Poppins_400Regular",
    	alignItems: 'center'
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
	  }
});