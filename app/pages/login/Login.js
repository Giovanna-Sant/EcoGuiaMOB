import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Logo from '../../assets/logo.svg';
import Google from '../../assets/icons/google.svg';

import API from '../../config/server';

export default function Login() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const navigation = useNavigation();
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

    // Estados para os inputs
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
  

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  };


  //função assíncrona que envia e recebe os dados da API
  async function getAPI_Login() {
    const apiURL = await API.post('login', {email, pwd});
    const cache  = require('../../config/cache');
    
    try{
      const [results] = await apiURL;
  
      if(results != 0){
      //caso o resultado do envio da query seja diferente de 0 linhas,
      //armazena o valor do token no cache da aplicação
        cache.set("tokenID", results.data.token);
      }else{
        console.log("Algo deu errado ao reconhecer o resultado da query e armazenar o token no cache.");
      }
  
      console.log(results);
      console.log(await cache.get("tokenID"));
      
      handlePress("Home");
    }catch(error){
      console.error("Algo deu errado ao logar usuário, tente novamente." + error);
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.fixedContent}>
        
        <Logo width={300} style={styles.logo} />
        <Text style={styles.title}>
          {isVisible ? 'Cadastre-se' : 'Fazer Login'}
        </Text>
        <View style={styles.googleContainer}>
          <Google width={25} height={25} />
          <Text style={styles.googleText}>
            {isVisible ? 'Criar conta com o Google' : 'Entrar com o Google'}
          </Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        {isVisible ? (
          <>
            <CustomInput placeholder="Nome" value={nome} onChangeText={setNome} />
            <CustomInput placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
            <CustomInput placeholder="seuemail@gmail.com" value={email} onChangeText={setEmail} />
            <CustomInput placeholder="Senha" secureTextEntry value={pwd} onChangeText={setPwd} />
            <CustomInput placeholder="Confirmar senha" secureTextEntry value={confirmPwd} onChangeText={setConfirmPwd} />
            
          </>
        ) : (
          <>
            <CustomInput placeholder="seuemail@gmail.com" value={email} onChangeText={setEmail}/>
            <CustomInput placeholder="Senha" secureTextEntry value={pwd} onChangeText={setPwd} />
            <TouchableOpacity
              style={styles.recover}
              onPress={() => handlePress("RedefinirSenha")}
            >
              <Text style={styles.recoverTexto}>Esqueci a Senha</Text>
            </TouchableOpacity>
              </>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={getAPI_Login}
        >
          <Text style={styles.botaoTexto}>Concluído</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {isVisible ? 'Já possui conta? ' : 'Não possui conta? '}
          </Text>
          <TouchableOpacity onPress={toggleVisibility}>
            <Text style={styles.loginText}>
              {isVisible ? 'Fazer Login' : 'Fazer Cadastro'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: "flex-start",
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

  recoverTexto: {
    fontFamily: "Poppins_400Regular",
    color: "#6BBF59",
    fontSize: 14,
    textDecorationLine: 'underline',

  },
});
