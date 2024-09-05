import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import Logo from '../assets/logo.svg';
import Google from '../assets/icons/google.svg';

export default function Login() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium });

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Logo width={300} marginTop={200} />

      <View style={styles.content}>
        <Text style={styles.title}>Cadastre-se</Text>
        <GoogleButton />
        
        <View style={styles.inputContainer}>
          <CustomInput placeholder="Nome" />
          <CustomInput placeholder="Sobrenome" />
          <CustomInput placeholder="seuemail@gmail.com" />
          <CustomInput placeholder="Senha" secureTextEntry />
          <CustomInput placeholder="Confirmar senha" secureTextEntry />
        </View>

        <View style={styles.footer}>
          <Button title="Concluído" color='#6BBF59' onPress={() => handlePress('Home')} />
          <Text style={styles.text}>
            Já possui conta? 
            <TouchableOpacity onPress={() => handlePress('Login')}>
              <Text style={styles.loginText}>Fazer Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}

const GoogleButton = () => (
  <View style={styles.googleContainer}>
    <Google width={25} height={25} />
    <Text style={styles.googleText}>Crie sua conta com o Google</Text>
  </View>
);

const CustomInput = ({ placeholder, secureTextEntry }) => (
  <TextInput 
    style={styles.input} 
    placeholder={placeholder} 
    secureTextEntry={secureTextEntry} 
  />
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 45
  },

  title: {
    marginTop: 40,
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    color: '#000',
  },

  googleContainer: {
    borderWidth: 2,
    borderRadius: 25,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: 'center',
    margin: 20,
  },

  googleText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },

  inputContainer: {
    gap: 10,
  },

  input: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 340,
    borderColor: '#3F463E',
    borderWidth: 0.50,
    height: 40,
    fontFamily: 'Poppins_400Regular',
  },

  loginText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#6BBF59',
  },

  footer: {
    marginVertical: 10,
  },

  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#000',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
