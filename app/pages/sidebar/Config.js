import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, Pressable, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity, Alert } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Detail, ArrowRight, ShowPassword, HidePassword, MissIcon } from "../../assets";
import { useNavigation } from '@react-navigation/native';
import cache from '../../utils/cache';
import cacheTemp from "../../utils/cache";
import api from '../../services/api';
import checkPwd from "../../utils/checkPwd";
import {useModal}   from '../login/ModalContext'; //abrir modal do token
import checkInfos from "../../utils/checkInfos";
import Login from "../login/Login";
import isEmail from 'validator/lib/isEmail';

const Config = () => {
	const [user, setUser] = useState({});
	const [email, setEmail] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [passwordVisibleA, setPasswordVisibleA] = useState(false);
	const [passwordVisibleB, setPasswordVisibleB] = useState(false);
	const { openModal } = useModal(); //abrir modal externa de token
	const [loading, setLoading] = useState(false); //armazena o estado de carregamento
	const [disabled, setDisabled] = useState(false); //armazena o estado de desativado
	const [modalVisible, setModalVisible] = useState(false); //armazena o estado de modal de erro
	const [modalMessage, setModalMessage] = useState(''); //define a mensagem de erro
	const [modalErro, setModalErro] = useState(''); //abrir modal externa de erro
	const [userAvatar, setUserAvatar] = useState('');
	const navigation = useNavigation();
	
	const [emailModalVisible, setEmailModalVisible] = useState(false);
	const [senhaModalVisible, setSenhaModalVisible] = useState(false);
	const [deletarModalVisible, setDeletarModalVisible] = useState(false);
	const [sairModalVisible, setSairModalVisible] = useState(false);
	const [confirmarSenhaModalVisible, setConfirmarSenhaModalVisible] = useState(false);

	const [emailAtual, setEmailAtual] = useState('');
	const [novoEmail, setNovoEmail] = useState('');
	const [confirmarEmail, setConfirmarEmail] = useState('');

	const [senhaAtual, setSenhaAtual] = useState('');
	const [tokenAtual, setTokenAtual] = useState('');
	const [novaSenha, setNovaSenha] = useState('');
	const [confirmarSenha, setConfirmarSenha] = useState('');

	const [senhaParaDeletar, setSenhaParaDeletar] = useState('');
	const [tokenParaAlterar, setTokenParaAlterar] = useState('');

	// Setar modal como visível
	const showModal = (message, erro) => {
		setModalMessage(message);
		setModalVisible(true);
		setModalErro(erro);
	};

	const handlePress = (screen) => {
		navigation.navigate(screen);
	};

	// Visualização de senha
	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const togglePasswordVisibilityA = () => {
		setPasswordVisibleA(!passwordVisibleA);
	};

	const togglePasswordVisibilityB = () => {
		setPasswordVisibleB(!passwordVisibleB);
	};

	// Carregamento de fontes
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
	});

	useEffect(() => {
		async function lerUser() {
			try{
				let cache_user  = await cache.get("dados");
				let cache_email = await cache.get("email");

				if (!cache_user || !cache_email){
					showModal('Algo deu errado :(');
					setModalErro('Não foi possível encontrar os dados de identificação do usuário.');
				}else{
					setUser(cache_user);
					setEmail(cache_email);			
				}
			}catch(error){
				console.error('Erro, função lerUser: ' + error);
				showModal('Algo deu errado :(');
				setModalErro('Não foi possível carregar os dados de identificação do usuário.');
			}finally{
				setLoading(false);
			}
		};
		lerUser();
	}, [user, email]);

	const modifyEmail = async () => {
		showModal('Função não disponível.');
		setModalErro('Lamentamos, em breve será disponibilizada...');
		stop;

		//variável de email sem espaçamentos acidentais p validações
		const validEmail = novoEmail
		.trim()
		.toLowerCase();

		const validEmail1 = confirmarEmail
		.trim()
		.toLowerCase();

		//validação de campos
		if (!novoEmail || !confirmarEmail) {
			showModal('Ops! Espera aí!');
			setModalErro('Por favor, preencha todos os campos.');
			return;
		}
		else if (!isEmail(validEmail)) {
			// se o e-mail for inválido, exibe como um alerta de campo
			showModal('Ops! Espera aí!');
			setModalErro('Por favor, insira um e-mail válido.');
			return;
		}
		else if(validEmail1 != validEmail){
			// se o e-mails não forem iguais, exibe como um alerta de campo
			showModal('Ops! Espera aí!');
			setModalErro('Os campos não batem.');
			return;
		} 

		//seta os estados de loading e desativa o botão de login
		setDisabled(true);
		setLoading(true);

		try {
			const token = await cache.get("tokenID");
			let response;

			if(token){
				const data = await api.put('/user/email/token', { email: validEmail }, {
					headers: {
						authorization: `Bearer ${token}`
					}
				});

				response = data;
			}else{
				//caso não tenha achado o token de identificação
				showModal('Algo deu errado :(');
				setModalErro('Não foi possível capturar o ID no cachê, recarregue o app.');

				return;
			}

			// Armazena o token no cache temporário (5 min)
			await cacheTemp.set("email", validEmail);
			await cacheTemp.set("tokenValidate", response.data.token);
					
			//switch para verificar o que foi retornado
			switch (response.status) {
				case 200:
					// Aguarda a modal de validar token
					const tokenValid = await openModal();

					if (tokenValid) {
						console.log('Email trocado com sucesso!');
						const data  = await api.put("/user/email/new", {
							email: novoEmail
						}, {
							headers: {
								authorization: `Bearer ${token}`
							}
						});
						console.log(data.data.msg);

						navigation.navigate("Tab_Home");
					} else {
						showModal('Algo deu errado :(');
						setModalErro('O seu token não foi validado com sucesso, repita o processo.');
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
				// Se for de falha na requisição sem resposta do servidor
				showModal('Erro de conexão');
				setModalErro('Sem resposta do servidor back-end. Verifique sua conexão.');
				console.error('Erro ilegal 02:', response);
			}
			// De toda maneira, exibe no console
			console.log('Erro captado no catch, função modifyEmail: ' + error);
		} finally {
			//desativa os estados de loading e ativa o botão de login
			setLoading(false);
			setDisabled(false);
		};
	};

	const modifyPwd = async () => {
		if(!senhaAtual || !novaSenha || !confirmarSenha){
			showModal('Ops! Espera aí!');
			setModalErro('Por favor, preencha todos os campos.');

			return;
		}

		setLoading(true);
		
		try {
			const token = await cache.get("tokenID");

			if(!token){
				showModal('Algo deu errado ao carregar o token de usuário :(');
				setModalErro('Não foi econtrado token de identificação armazenado no cachê. \n Faça login novamente.');

				return;
			} 
			
			//variável de email sem espaçamentos acidentais p validações
			const validPwd = novaSenha.trim();

			const validPwd1 = confirmarSenha.trim();

			// chama função para verificar senha
			const verificate = checkPwd(validPwd);

			//validação de campos
			if(!verificate[0]){
				// se a senha for inválida, exibe como um alerta de campo
				const msg = verificate[1];
				showModal('Ops! Espera aí!');
				setModalErro(msg);

				return;
			}else if(validPwd !== validPwd1){
				showModal('Ops! Espera aí!');
				setModalErro('Os campos de nova senha não batem.');
				
				return;
			}

			const data = await api.put('/user/pwd', {newPwd: validPwd1}, {
				headers: {
					authorization: `Bearer ${token}`
				}
			});

			const response = data;

			//switch para verificar o que foi retornado
			switch (response.status) {
				case 200:
					await checkInfos();
					showModal('Eba!');
					setModalErro('Senha alterada com sucesso!');

					toggleSenhaModal();
				break;
			};
		}catch (error) {
			// Se houver erro, verifica se é um erro de resposta
			if (error.response) {
				const status = error.response.status;
				const msg = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

				// Tratando erros com base no código de status
				switch (status) {
					case 500:
						showModal('Algo deu errado com a conexão :(', msg);
						setModalErro(msg);
					break;

					default:
					showModal('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
				}
			} else if (error.request) {
				// Se houver falha na requisição sem resposta do servidor
				showModal('Erro de conexão');
				setModalErro(`Sem resposta do servidor. \n Verifique sua conexão`);
			} else {
				// Outros tipos de erro (como erros de configuração)
				showModal('Erro', 'Erro desconhecido');
			}
			console.error('Erro ilegal:', error);
		}finally{
			setLoading(false);
		}
	};

	const deleteUser = async () => {
		if(!senhaParaDeletar){
			showModal('Ops! Espera aí!');
			setModalErro('Por favor, preencha o campo.');

			return;
		}

		setLoading(true);

		try {
			const token = await cache.get("tokenID");

			if(!token){
				showModal('Algo deu errado ao carregar o token de usuário :(');
				setModalErro('Não foi econtrado token de identificação armazenado no cachê. \n Faça login novamente.');

				return;
			};

			//variável de email sem espaçamentos acidentais p validações
			const validPwd = senhaParaDeletar.trim();

			const data = await api.delete('/user', {
				headers: {
				  authorization: `Bearer ${token}`
				},
				data: {
				  pwdHash: validPwd
				},
			});

			const response = data;

			//switch para verificar o que foi retornado
			switch (response.status) {
				case 200:
					navigation.navigate('Login');
					
					showModal('Que pena que nos deixou!');
					setModalErro('Sempre há uma nova possibilidade...');
				break;
			};
		}catch (error) {
			// Se houver erro, verifica se é um erro de resposta
			if (error.response) {
				const status = error.response.status;
				const msg = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

				// Tratando erros com base no código de status
				switch (status) {
					case 404:
						showModal('Algo deu errado :(');
						setModalErro(msg);
					break;

					case 422:
						showModal('Algo deu errado :(');
						setModalErro(msg);
					break;

					case 500:
						showModal('Algo deu errado com a conexão:(');
						setModalErro(msg);
					break;

					case 503:
						showModal('Algo deu errado :(');
						setModalErro(msg);
					break;

					default:
					showModal('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
					console.error('Erro ilegal:', error);
				}
			} else if (error.request) {
				// Se houver falha na requisição sem resposta do servidor
				showModal('Erro de conexão');
				setModalErro(`Sem resposta do servidor. \n Verifique sua conexão`);
				console.error('Erro ilegal:', error);
			} else {
				// Outros tipos de erro (como erros de configuração)
				showModal('Erro', 'Erro desconhecido');
				console.error('Erro ilegal:', error);
			}
		}finally{
			setLoading(false);
		}
	}

	const toggleEmailModal = () => {
		setEmailModalVisible(!emailModalVisible);
	};

	const toggleSenhaModal = () => {
		setSenhaModalVisible(!senhaModalVisible);
	};

	const toggleDeletarModal = () => {
		setDeletarModalVisible(!deletarModalVisible);
	};

	const toggleSairModal = () => {
		setSairModalVisible(!sairModalVisible);
	};

	const toggleConfirmarSenhaModal = () => {
		setConfirmarSenhaModalVisible(!confirmarSenhaModalVisible);
	};

	const indoLogin = () => {
		navigation.navigate('Login');
	};

	const handleSenhaSave = () => {
		modifyPwd();
	};

	const handleDeleteAccount = () => {
		deleteUser()
	};

	const handleConfirmarSenha = () => {
		if (senhaParaDeletar === senhaAtual) {
			alert('Conta deletada com sucesso!');
			toggleConfirmarSenhaModal();
		} else {
			alert('Senha incorreta!');
		}
		toggleConfirmarSenhaModal();
	};

	if (!fontsLoaded) {
		return (
			<ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
		);
	}

	const renderModal = (visible, setVisible, content) => (
		<Modal visible={visible} transparent animationType="fade">
			<TouchableWithoutFeedback onPress={() => setVisible(false)}>
				<View style={styles.modalOverlay}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContainer}>
							{content}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{/* Modal de erro */}
			<Modal
				transparent={true}
				animationType="fade"
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay1}>
					<View style={styles.modalContainer1}>
						<MissIcon width={45} height={45}/>
						<Text style={styles.textModal1}>{modalMessage}</Text>
						<Text style={styles.textModal1}>{String(modalErro)}</Text>
						<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
							<Text style={styles.recoverTexto}>Fechar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<View style={styles.content}>
				<Text style={styles.titulo}>Configurações da Conta</Text>
				<View style={styles.divPerfil}>
				<View style={styles.iconDiv}>
					<Image
						style={styles.icon}
						width={40}
						height={40}
						source={{
						uri: `${user.blob_avatar}`,
						}}
					/>
            	</View>
					<View>
						<Text style={styles.subtitulo}>Perfil</Text>
						<Text style={styles.info}>{user.nickname_user}</Text>
					</View>
				</View>

				<View style={styles.div}>
					<Text style={styles.subtitulo}>Informações Pessoais</Text>
					<Text style={styles.info}>{user.name_user} {user.lastname_user}</Text>
					<Text style={styles.info}>{email}</Text>
				</View>

				<View style={styles.div}>
					<Pressable style={styles.operacao} onPress={toggleEmailModal}>
						<Text style={styles.txtOperacao}>Alterar Email</Text>
						<ArrowRight />
					</Pressable>
					<Pressable style={styles.operacao} onPress={toggleSenhaModal}>
						<Text style={styles.txtOperacao}>Alterar Senha</Text>
						<ArrowRight />
					</Pressable>
					<Pressable style={styles.operacao} onPress={toggleDeletarModal}>
						<Text style={styles.txtOperacao}>Deletar Conta</Text>
						<ArrowRight />
					</Pressable>
					<Pressable style={styles.operacao} onPress={toggleSairModal}>
						<Text style={styles.txtOperacao}>Sair da Conta</Text>
						<ArrowRight />
					</Pressable>
				</View>
				<Image source={Detail} style={styles.detalhe} />

				{renderModal(sairModalVisible, setSairModalVisible, (
					<>
						<Text style={styles.title}>Sair da Conta</Text>
						<Text style={styles.label}>Você realmente deseja sair da sua conta?</Text>

						<View style={styles.buttonContainer}>
							<Pressable style={styles.confirmButton} onPress={toggleSairModal}>
								<Text style={styles.buttonTextConfir}>Cancelar</Text>
							</Pressable>
							<Pressable style={styles.cancelButton} onPress={indoLogin}>
								<Text style={styles.buttonText}>Sair da Conta</Text>
							</Pressable>
						</View>
					</>
				))}

				{renderModal(emailModalVisible, setEmailModalVisible, (
					<>
						<Text style={styles.title}>Atualizar seu email</Text>
						<Text style={styles.label}>Novo email:</Text>
						<View style={styles.inputView}>
						<TextInput
							style={styles.textInput}
							value={novoEmail}
							onChangeText={setNovoEmail}
							placeholder="novoemail@gmail.com"
						/>
						</View>
						<Text style={styles.label}> Confirmar novo email:</Text>
						
						<View style={styles.inputView}>
							<TextInput
								style={styles.textInput}
								value={confirmarEmail}
								onChangeText={setConfirmarEmail}
								placeholder="novoemail@gmail.com"
								/>
						</View>
						<View style={styles.buttonContainer}>
							<Pressable style={styles.confirmButton} onPress={toggleEmailModal}>
								<Text style={styles.buttonTextConfir}>Cancelar</Text>
							</Pressable>
							<Pressable style={styles.cancelButton} 
							disabled={disabled || loading}
							onPress={() => modifyEmail()}>

							{loading ? (
						<ActivityIndicator size="small" color="#fff" />
						) : (
						<Text style={styles.buttonText}>confirmar</Text>
						)}
							</Pressable>
						</View>
					</>
				))}

				{renderModal(senhaModalVisible, setSenhaModalVisible, (
					<>
						<Text style={styles.title}>Alteração Senha</Text>
						<Text style={styles.label}>Senha Atual:</Text>
						<View style={styles.inputView}>
							<TextInput
								value={senhaAtual}
								onChangeText={setSenhaAtual}
								secureTextEntry={!passwordVisible}
								style={styles.textInput}
							/>
							<TouchableOpacity onPress={togglePasswordVisibility}>
								{passwordVisible ? <HidePassword width={24} height={24} /> : <ShowPassword width={24} height={24} />}
							</TouchableOpacity>
						</View>

						<Text style={styles.label}>Nova Senha:</Text>
						<View style={styles.inputView}>
							<TextInput 
								value={novaSenha}
								onChangeText={setNovaSenha}
								secureTextEntry={!passwordVisibleA}
								style={styles.textInput}
							/>
							<TouchableOpacity onPress={togglePasswordVisibilityA}>
								{passwordVisibleA ? <HidePassword width={24} height={24} /> : <ShowPassword width={24} height={24} />}
							</TouchableOpacity>
						</View>

						<Text style={styles.label}>Confirmar Nova Senha:</Text>
						<View style={styles.inputView}>
							<TextInput
								value={confirmarSenha}
								onChangeText={setConfirmarSenha}
								secureTextEntry={!passwordVisibleB}
								style={styles.textInput}
							/>
								<TouchableOpacity onPress={togglePasswordVisibilityB}>
									{passwordVisibleB ? <HidePassword width={24} height={24} /> : <ShowPassword width={24} height={24} />}
								</TouchableOpacity>
						</View>

						<View style={styles.buttonContainer}>
							
								{loading ? (
										<Text></Text>
									):(
										<Pressable style={styles.confirmButton} onPress={toggleSenhaModal}> 
										<Text style={styles.buttonTextConfir}>Cancelar</Text>
										</Pressable>
									)}
							
								<Pressable style={styles.cancelButton} 
									disabled={disabled || loading}
									onPress={() => handleSenhaSave()}
								>
									{loading ? (
										<ActivityIndicator size="small" color="#fff" />
										) : (
										<Text style={styles.buttonText}>confirmar</Text>
										)
									}
								</Pressable>
						</View>
					</>
				))}

				{renderModal(deletarModalVisible, setDeletarModalVisible, (
					<>
						<Text style={styles.title}>Deletar Conta</Text>
						<Text style={styles.label}>Você realmente deseja deletar sua conta?</Text>
						<View style={styles.inputView}>
							<TextInput 
								value={senhaParaDeletar}
								placeholder="Confirme sua senha"
								onChangeText={setSenhaParaDeletar}
								secureTextEntry={!passwordVisible}
								style={styles.textInput}
							/>
								<TouchableOpacity onPress={togglePasswordVisibility}>
									{passwordVisible ? <HidePassword width={24} height={24} /> : <ShowPassword width={24} height={24} />}
								</TouchableOpacity>
						</View>
						<View style={styles.buttonContainer}>
							<Pressable style={styles.confirmButton} onPress={toggleDeletarModal}>
								<Text style={styles.buttonTextConfir}>Cancelar</Text>
							</Pressable>
							<Pressable style={styles.cancelButton} onPress={handleDeleteAccount}>
								<Text style={styles.buttonText}>Deletar Conta</Text>
							</Pressable>
						</View>
					</>
				))}

				{renderModal(confirmarSenhaModalVisible, setConfirmarSenhaModalVisible, (
					<>
						<Text style={styles.title}>Confirmar Senha</Text>
						<TextInput
							style={styles.input}
							value={senhaParaDeletar}
							onChangeText={setSenhaParaDeletar}
							secureTextEntry
							placeholder="Digite sua senha"
						/>
						<View style={styles.buttonContainer}>
							<Pressable style={styles.confirmButton} onPress={handleConfirmarSenha}>
								<Text style={styles.buttonTextConfir}>Cancelar</Text>
							</Pressable>
							<Pressable style={styles.cancelButton} onPress={handleConfirmarSenha}>
								<Text style={styles.buttonText}>Confirmar</Text>
							</Pressable>
						</View>
					</>
				))}

			</View>
		</ScrollView>
	);
};
export default Config;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		paddingBottom: 50,
	},
	content: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	titulo: {
		fontFamily: 'Poppins_600SemiBold',
		fontSize: 30,
		color: "#3F463E",
		textAlign: 'center',
		maxWidth: 300,
		marginBottom: 10
	},
	subtitulo: {
		fontFamily: 'Poppins_500Medium',
		fontSize: 18
	},
	info: {
		fontFamily: 'Poppins_400Regular',
		fontSize: 14
	},
	txtOperacao: {
		fontFamily: 'Poppins_500Medium',
		fontSize: 16
	},
	div: {
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#6BBF59',
		padding: 10,
		margin: 8,
		width: '95%',
	},
	divPerfil: {
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#6BBF59',
		padding: 10,
		margin: 8,
		width: '95%',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10
	},

	iconDiv: {
		borderColor: "#A6D89B",
		backgroundColor: "#F1F1F1",
		borderWidth: 3,
		borderRadius: 50,
		padding: 8,
		marginRight: 10,
	},

	icon: {
		width: 40,
		height: 40,
		borderRadius: 50
	},
	
	operacao: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-between',
		margin: 5,
		alignItems: 'center'
	},
	
	detalhe: {
		maxWidth: 320,
		maxHeight: 85,
		marginTop: 40
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	modalContainer: {
		width: 350,
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 10,
	},
	
	title: {
		fontSize: 18,
		color: '#333',
		fontFamily: 'Poppins_500Medium',
		textAlign: 'center',
		marginBottom: 10,
	},
	
	label: {
		fontSize: 12,
		color: '#333',
		fontFamily: 'Poppins_500Medium',
		marginTop: 10
	},
	
	delete: {
		fontSize: 16,
		color: '#333',
		fontFamily: 'Poppins_500Medium',
		textAlign: 'center',
		marginLeft: 50,
		marginRight: 50,
	},
	
	input: {
		borderColor: '#6BBF59',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
		height: 40,
	},
	
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
	},
	
	confirmButton: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#6BBF59',
		flex: 1,
		marginHorizontal: 5,
	},
	
	cancelButton: {
		backgroundColor: '#6BBF59',
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		flex: 1,
		marginHorizontal: 5,
		textAlign: 'center',
		justifyContent: 'center'
	},
	
	buttonText: {
		color: '#fff',
		fontFamily: 'Poppins_500Medium',
	},
	
	buttonTextConfir: {
		color: '#6BBF59',
		fontFamily: 'Poppins_500Medium',
	},

	inputView: {
		backgroundColor: "#F1F1F1",
		height: 40,
		paddingHorizontal: 10,
		borderRadius: 5,
		marginVertical: 5,
		borderColor: "#3F463E",
		borderWidth: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	textInput: {
		width: 260,
		height: 50,
		fontFamily: "Poppins_400Regular",
		alignItems: 'center'
	},

	recoverTexto: {
		fontFamily: "Poppins_400Regular",
		color: "#6BBF59",
		fontSize: 14,
		textDecorationLine: 'underline',
		textAlign: 'center'
	},

	modalOverlay1: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	
	modalContainer1: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 10,
	},
	
	textModal1: {
		textAlign: 'center',
		fontFamily: "Poppins_400Regular",
		fontSize: 14,
	}
});
