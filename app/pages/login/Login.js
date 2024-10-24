import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { LogoEcoGuia, Google } from '../../assets';
import api from '../../services/api';
import cache from '../../utils/cache';
import validator from 'validator';	// biblioteca que verifica o formato do e-mail

export default function Login() {
	const [isVisible, setIsVisible] = useState(true);
	const [email, setEmail] 		  = useState('');
	const [pwd,   setSenha] 		  = useState('');
	// const [pwdVisible, setpwdVisible] = useState(false);
	const [loading,    setLoading]	  = useState(false);
	const [disabled,   setDisabled]	  = useState(false);

	//uma variável de email sem espaçamentos acidentais p validações
	const validEmail = email.trim();

	//função para validar se o campo de e-mail foi preenchido corretamente
	const isEmailValid = (email) => {
		return validator.isEmail(email);
	};

	const login  = async (event) => {
		event.preventDefault();

		//validação de campos
		if (!email && !pwd){
			Alert.alert('Erro', 'Por favor, preencha todos os campos.');
			return;
		}else if (!isEmailValid(validEmail)) {
			// se o e-mail for inválido, exibe como um alerta de campo
			Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
			return;
		}else if (pwd.length < 8) {
			// se a senha for inválida, exibe como um alerta de campo
			Alert.alert('Erro', 'Por favor, insira uma senha válida.');
			return;
		};

		//seta os estados de loading e desativa o botão de login
		setDisabled(true);
		setLoading(true);

		try{
			//define um limite para o tempo de espera de 5 segundos
			const controller = new AbortController();
			const timeout	 = setTimeout(() => controller.abort(), 5000);

			const data = await api.post('/user/login', {email,pwd});
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
						Alert.alert('Algo deu errado com os campos :(', msg);
					break;

					case 404:
						Alert.alert('Algo deu errado com o usuário :(', msg);
					break;

					case 400:
						Alert.alert('Algo deu errado com a senha :(',   msg);
					break;

					case 500:
						Alert.alert('Algo deu errado com a conexão :(', msg);
					break;

					default:
					Alert.alert('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente.');
					console.error('Erro ilegal:', response);
				}
			} else if (error.request) {
				// Se houver falha na requisição sem resposta do servidor
				Alert.alert('Erro de conexão', 'Sem resposta do servidor. Verifique sua conexão');
			} else {
				// Outros tipos de erro (como erros de configuração)
				Alert.alert('Erro', 'Erro desconhecido.');
			}
		} finally {
			//desativa os estados de loading e ativa o botão de login
			setLoading(false);
			setDisabled(false);
		};
	}

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
						<Text style={styles.botaoTexto}>Login</Text>
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
					<CustomInput placeholder="Nome" />
					<CustomInput placeholder="Sobrenome" />
					<CustomInput placeholder="Seuemail@email.com" />
					<CustomInput placeholder="Senha" secureTextEntry />
					<CustomInput placeholder="Confirmar senha" secureTextEntry />
				</View>

				<View style={styles.footer}>
				<TouchableOpacity
					style={styles.botao}
					onPress={() => handlePress("Home")}
				>
					<Text style={styles.botaoTexto}>Cadastrar</Text>
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
});