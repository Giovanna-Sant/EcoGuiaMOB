import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, Pressable, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Detail, ArrowRight, ShowPassword, HidePassword } from "../../assets";
import { useNavigation } from '@react-navigation/native';
import cache from '../../utils/cache'
import api from '../../services/api';
import {useModal}   from '../login/ModalContext'; //abrir modal do token
import checkInfos from "../../utils/checkInfos";
import bcrypt from 'bcryptjs'
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
	const navigation = useNavigation();
  
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [senhaModalVisible, setSenhaModalVisible] = useState(false);
  const [deletarModalVisible, setDeletarModalVisible] = useState(false);
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
      setUser(await cache.get("dados"));
      setEmail(await cache.get("email"));
      setHash(await cache.get('hash'))
    };
    lerUser();
  }, [user, email]);

  const [hash,setHash] = useState('')
  const modifyPwd = async () => {
    setLoading(true)
    const token = await cache.get("tokenID");
    try {
      const checkPwd = bcrypt.compareSync(senhaAtual,hash)
      if (!checkPwd) {
        alert('Senha atual incorreta')
        setLoading(false)
        return;
      }
      if (novaSenha !== confirmarSenha) {
        alert('As senhas não conferem');
        setLoading(false)
        return;
      }
      const response = await api.put('/user/pwd', {
        newPwd: novaSenha
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      alert("Senha alterada com sucesso!");
      setLoading(false)
      toggleSenhaModal();
    } catch (erro) {
      console.log(erro);
    }
   await checkInfos()
  };

  const modifyEmail = async () => {
    //uma variável de email sem espaçamentos acidentais p validações
		const validEmail = novoEmail
		.trim()
		.toLowerCase();

    //validação de campos
		if (!novoEmail) {
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
      const data = await api.put('/user/email/token', { email: validEmail }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
			console.log(data.data);
			console.log(data.data.token);

			const response = data;

      // Armazena o token no cache temporário (5 min)
      await cacheTemp.set("email", validEmail);
      await cacheTemp.set("tokenValidate", response.data.token);
      
      console.log(response);
      // Aguarda a modal de validar token
      const tokenValid = await openModal();
      if (tokenValid) {
        console.log('Email trocado com sucesso!');
        const token = await cache.get("tokenID");
        const data = await api.put("/user/email/new", {
          email: novoEmail
        }, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log(data.data.msg);
        console.log(data.data.token);
        navigation.navigate("Home");
      } else {
        Alert.alert('Ops, algo deu errado :(', 'O seu token não foi validado com sucesso, repita o processo.');
      }
      // //switch para verificar o que foi retornado
			// switch (response.status) {
			// 	case 200:
			// 	break;
			// }
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
  };


  const deleteUser = async () => {
 
    try {
      const token = await cache.get("tokenID");
      const response = await api.delete('/user', {
        headers: {
          authorization: `Bearer ${token}`
        },
        data: {
          pwdHash: senhaParaDeletar
        },
      });
      handlePress(Login)
    } catch (erro) {
      console.log(erro);
    }
  }

  const toggleEmailModal = () => {
    setEmailModalVisible(!emailModalVisible);
  };

  const toggleTokenModal = () => {
    modifyEmail();
  };

  const toggleSenhaModal = () => {
    setSenhaModalVisible(!senhaModalVisible);
  };

  const toggleDeletarModal = () => {
    setDeletarModalVisible(!deletarModalVisible);
  };

  const toggleConfirmarSenhaModal = () => {
    setConfirmarSenhaModalVisible(!confirmarSenhaModalVisible);
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
      <View style={styles.content}>
        <Text style={styles.titulo}>Configurações da Conta</Text>
        <View style={styles.divPerfil}>
          <View style={styles.iconDiv}><Image width={40} height={40} source={{ uri: 'https://cdn-icons-png.flaticon.com/256/903/903482.png' }} /></View>
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
        </View>
        <Image source={Detail} style={styles.detalhe} />

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
              {/* <Pressable style={styles.cancelButton} onPress={toggleTokenModal}>
              <Pressable style={styles.cancelButton}  onPress={() => handleSenhaSave()}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </Pressable> */}
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
              onPress={() => handleSenhaSave()}>

              {loading ? (
						<ActivityIndicator size="small" color="#fff" />
						) : (
						<Text style={styles.buttonText}>confirmar</Text>
						)}
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
    backgroundColor: '#f1f1f1',
    padding: 8,
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
});
