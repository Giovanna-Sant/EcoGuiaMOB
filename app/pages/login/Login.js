import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { LogoEcoGuia, Google } from '../../assets';
import api from '../../services/api';
import cache from '../../utils/cache'

export default function Login() {
  const [isVisible, setIsVisible] = useState(true);

  const [email, setEmail] = useState('');
  const [pwd, setSenha] = useState('');

  const login  = async (event) => {
  event.preventDefault();
     try{
        console.log(email);
        console.log(pwd);
        const response = await api.post('/user/login', {email,pwd});
        console.log(response.data);
        console.log(response.data.token)
        await cache.set("tokenID",response.data.token)
        await cache.set("email",email),
        handlePress("Home")

        }catch(erro){
        console.log(email);
        console.log(pwd);
        console.log(erro);
        console.log(erro.response.data)
        }
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
          <View style={styles.googleContainer}>
            <Google width={25} height={25} />
            <Text style={styles.googleText}>Entrar com o Google</Text>
          </View>

          <View style={styles.inputContainer}>
          <CustomInput placeholder="seuemail@gmail.com" onChangeText={setEmail} />
          <CustomInput placeholder="Senha" secureTextEntry onChangeText={setSenha}/>
            <TouchableOpacity
              style={styles.recover}
              onPress={() => handlePress("RedefinirSenha")}
            >
              <Text style={styles.recoverTexto}>Esqueci a Senha</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.botao}
              onPress={login}
            >
              <Text style={styles.botaoTexto}>Concluído</Text>
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.text}>Não possui conta?</Text>
              <TouchableOpacity onPress={toggleVisibility}>
                <Text style={styles.loginText}>Fazer Cadastro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        // Cadastro Content
        <View style={styles.fixedContent}>
          <LogoEcoGuia width={300} style={styles.logo} />
          <Text style={styles.title}>Cadastro</Text>
          <View style={styles.googleContainer}>
            <Google width={25} height={25} />
            <Text style={styles.googleText}>Criar conta com o Google</Text>
          </View>

          <View style={styles.inputContainer}>
            <CustomInput placeholder="Nome" />
            <CustomInput placeholder="Sobrenome" />
            <CustomInput placeholder="seuemail@gmail.com" />
            <CustomInput placeholder="Senha" secureTextEntry />
            <CustomInput placeholder="Confirmar senha" secureTextEntry />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => handlePress("Home")}
            >
              <Text style={styles.botaoTexto}>Concluído</Text>
            </TouchableOpacity>

            <View style={styles.textContainer}>
              <Text style={styles.text}>Já possui conta?</Text>
              <TouchableOpacity onPress={toggleVisibility}>
                <Text style={styles.loginText}>Fazer Login</Text>
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
    paddingLeft: 5
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