import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, Pressable, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Logo from '../assets/logo.svg';
import Google from '../assets/icons/google.svg';

export default function Login() {
  // Função para setar visibilidade login/cadastro
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Navegação das páginas
  const navigation = useNavigation();
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  // Carregamento das fontes
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
    <View style={styles.container}>
      <Logo width={300} marginTop={200} />

      {isVisible ? (
        // Cadastro
        <View style={styles.visibleElements}>
          <View style={styles.contentLogin}>
            <Text style={styles.title}>Cadastre-se</Text>
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
              <Text style={styles.text}>
                Já possui conta?
                <TouchableOpacity onPress={toggleVisibility}>
                  <Text style={styles.loginText}>Fazer Login</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      ) : (
        // Login
        <View style={styles.hiddenElements}>
          <View style={styles.contentLogin}>
            <Text style={styles.title}>Fazer Login</Text>
            <View style={styles.googleContainer}>
              <Google width={25} height={25} />
              <Text style={styles.googleText}>Entrar com o Google</Text>
            </View>

            <View style={styles.inputContainer}>
              <CustomInput placeholder="seuemail@gmail.com" />
              <CustomInput placeholder="Senha" secureTextEntry />
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.botao}
                onPress={() => handlePress("Home")}
              >
                <Text style={styles.botaoTexto}>Concluído</Text>
              </TouchableOpacity>
              <Text style={styles.text}>
                Não possui conta?
                <TouchableOpacity onPress={toggleVisibility}>
                  <Text style={styles.loginText}>Fazer Cadastro</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const CustomInput = ({ placeholder, secureTextEntry }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
  />
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  contentLogin: {
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    marginTop: 80,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#3F463E",
  },

  googleContainer: {
    borderWidth: 2,
    borderRadius: 25,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: "center",
    margin: 5,
  },

  googleText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#000",
    marginLeft: 8,
  },

  inputContainer: {},

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
    marginVertical: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#000",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  botao: {
    backgroundColor: "#6BBF59",
    borderRadius: 25,
    alignItems: "center",
    maxWidth: 160,
    paddingHorizontal: 20,
    paddingVertical: 3,
  },

  botaoTexto: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: 16,
  },
});
