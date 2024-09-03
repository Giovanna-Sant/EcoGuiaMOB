import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import Logo from '../assets/logo.svg'
import Google from '../assets/icons/google.svg'

export default function Login() {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

    return (
        <View style={estilos.container}>
            <Logo width={240} marginTop={200}/>

            <View style={estilos.contMeio}>
                <Text style={estilos.titulo}>Cadastre-se</Text>
                <View style={estilos.logGoogle}>
                    <Google width={25} height={25}/>
                    <Text>Crie sua conta com o Google</Text>
                </View>
                    <TextInput style={estilos.input} placeholder="Nome"></TextInput>
                    <TextInput style={estilos.input} placeholder="Sobrenome"></TextInput>
                    <TextInput style={estilos.input} placeholder="seuemail@gmail.com"></TextInput>
                    <TextInput style={estilos.input} placeholder="Senha"></TextInput>
                    <TextInput style={estilos.input} placeholder="Confirmar senha"></TextInput>

            <View style={estilos.contFinal}>
                <Button style={estilos.botao} title="Concluído" color='#6BBF59' onPress={() => handlePress('Home')}/>
                <Text style={estilos.texto}>Já possui conta?<TouchableOpacity style={estilos.irLogin}><Text style={estilos.irLogin}>Fazer Login</Text></TouchableOpacity></Text>
            </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    
    contMeio: {        
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 45
    },

    titulo: {
        marginTop: 40,
    },

    logGoogle: {
        borderWidth: 2,
        borderRadius: 25,
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 2,
        justifyContent: 'center',
        margin: 20
    },

    input: {
        backgroundColor: '#F1F1F1',
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: 340,
        borderColor: '#3F463E',
        borderWidth: 0.50
    },

    irLogin: {
       color: '#6BBF59',
       textDecorationLine: 'underline',
       alignItems: 'center',
       justifyContent: 'center'
    },

    contFinal: {
        marginVertical: 10
    }
  });