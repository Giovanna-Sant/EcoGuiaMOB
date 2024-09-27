
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, Pressable, Modal, TextInput } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Seta from '../../assets/icons/arrowRight.svg';
import Detail from '../../assets/backgrounds/detail.png';
import Header from "../../components/Header";

const Config = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [tokenModalVisible, setTokenModalVisible] = useState(false);
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

  const toggleEmailModal = () => {
    setEmailModalVisible(!emailModalVisible);
  };

  const toggleTokenModal = () => {
    setTokenModalVisible(!tokenModalVisible);
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

  const handleEmailSave = () => {
    toggleEmailModal();
  };

  const handleSenhaSave = () => {
    toggleSenhaModal();
  };

  const handleDeleteAccount = () => {
    toggleDeletarModal();
    toggleConfirmarSenhaModal();
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

  const handleConfirmarToken = () => {
    if (tokenParaAlterar === tokenAtual) {
      alert('Email atualizado com sucesso!')

    } else {
      alert('Código de acesso incorreta!');
    }
  };

  if (!fontsLoaded) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.titulo}>Configurações da Conta</Text>
        <View style={styles.divPerfil}>
          <View style={styles.iconDiv}><Image width={40} height={40} source={{ uri: 'https://cdn-icons-png.flaticon.com/256/903/903482.png' }} /></View>
          <View>
            <Text style={styles.subtitulo}>Perfil</Text>
            <Text style={styles.info}>yasmin#1837</Text>
          </View>
        </View>

        <View style={styles.div}>
          <Text style={styles.subtitulo}>Informações Pessoais</Text>
          <Text style={styles.info}>Yasmin Benjor</Text>
          <Text style={styles.info}>yasminbenjor@gmail.com</Text>
        </View>

        <View style={styles.div}>
          <Pressable style={styles.operacao} onPress={toggleEmailModal}>
            <Text style={styles.txtOperacao}>Alterar Email</Text>
            <Seta />
          </Pressable>
          <Pressable style={styles.operacao} onPress={toggleSenhaModal}>
            <Text style={styles.txtOperacao}>Alterar Senha</Text>
            <Seta />
          </Pressable>
          <Pressable style={styles.operacao} onPress={toggleDeletarModal}>
            <Text style={styles.txtOperacao}>Deletar Conta</Text>
            <Seta />
          </Pressable>
        </View>
        <Image source={Detail} style={styles.detalhe} />

        {/* Modal para Alterar Email */}
        <Modal visible={emailModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Atualizar seu email</Text>
              <Text style={styles.label}>Novo email:</Text>
              <TextInput
                style={styles.input}
                value={novoEmail}
                onChangeText={setNovoEmail}
              />
              <Text style={styles.label}> Confirmar novo email:</Text>
              <TextInput
                style={styles.input}
                value={confirmarEmail}
                onChangeText={setConfirmarEmail}
              />
              <View style={styles.buttonContainer}>
                <Pressable style={styles.confirmButton} onPress={toggleEmailModal}>
                  <Text style={styles.buttonTextConfir}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={toggleTokenModal}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal para Alterar Senha */}
        <Modal visible={senhaModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Alteração Senha</Text>
              <Text style={styles.label}>Senha Atual:</Text>
              <TextInput
                style={styles.input}
                value={senhaAtual}
                onChangeText={setSenhaAtual}
                secureTextEntry
              />
              <Text style={styles.label}>Nova Senha:</Text>
              <TextInput
                style={styles.input}
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
              />
              <Text style={styles.label}>Confirma Nova Senha:</Text>
              <TextInput
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
              />
              <View style={styles.buttonContainer}>
                <Pressable style={styles.confirmButton} onPress={toggleSenhaModal}>
                  <Text style={styles.buttonTextConfir}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={handleSenhaSave}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal para Deletar Conta */}
        <Modal visible={deletarModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.delete}>Você deseja DELETAR sua conta?</Text>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.confirmButton} onPress={toggleDeletarModal}>
                  <Text style={styles.buttonTextConfir}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={handleDeleteAccount}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de confirmação para deletar conta */}
        <Modal visible={confirmarSenhaModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>yasmin#3452 confirme a senha da sua conta para haver a exclusão.</Text>
              <TextInput
                style={styles.input}
                value={senhaParaDeletar}
                onChangeText={setSenhaParaDeletar}
                secureTextEntry
              />
              <View style={styles.buttonContainer}>
                <Pressable style={styles.confirmButton} onPress={toggleConfirmarSenhaModal}>
                  <Text style={styles.buttonTextConfir}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={handleConfirmarSenha}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Token para Confirmar alteração de email. */}
        <Modal visible={tokenModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Um código de acesso foi enviado ao novo email. Insira-o abaixo para confirmar a alteração.</Text>
              <TextInput
                style={styles.input}
                value={senhaParaDeletar}
                onChangeText={setTokenParaAlterar}
                secureTextEntry
              />
              <View style={styles.buttonContainer}>
                <Pressable style={styles.confirmButton} onPress={toggleTokenModal}>
                  <Text style={styles.buttonTextConfir}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={handleConfirmarToken}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
    margin: 5,
    width: '95%',
  },
  divPerfil: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#6BBF59',
    padding: 10,
    margin: 5,
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
    margin: 3,
    alignItems: 'center'
  },
  
  detalhe: {
    maxWidth: 320,
    maxHeight: 85,
    marginTop: 40
  },
  // Modal Styles
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
    fontSize: 10,
    color: '#333',
    fontFamily: 'Poppins_500Medium',
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
});
