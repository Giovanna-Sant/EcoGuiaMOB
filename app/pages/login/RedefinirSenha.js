import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_300Light } from '@expo-google-fonts/poppins';
import { LogoEcoGuia } from '../../assets';
import api from '../../services/api'
import cache from '../../utils/cache'

export default function RedefinirSenha() {
  const navigation = useNavigation();

  const [email, setEmail] =  useState('')

  const sendEmail = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/token", { email });
      console.log(response.data);
      console.log(response.data.token);
      await cache.set("token", response.data.token);
      console.log(await cache.get("token"));
      await cache.set("email", email);
      navigation.navigate("Token");
    } catch (erro) {
      console.log(email);
      console.log(erro.response.data);
    }
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
      <View style={styles.fixedContent}>
        <LogoEcoGuia width={300} style={styles.logo} />
        <Text style={styles.title}>Confirme seu email</Text>
        <Text style={styles.sub}>Informe o email de sua conta para receber um código para redefinição de senha</Text>
      </View>

      <View style={styles.inputContainer}>
        <CustomInput placeholder="seuemail@gmail.com" onChangeText={setEmail} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={sendEmail}
        >
          <Text style={styles.botaoTexto}>Enviar Código</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.passoTexto}>Passo 1</Text>
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
});
