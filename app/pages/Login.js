import React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import Logo from '../assets/logo.svg'
import Google from '../assets/icons/google.svg'

export default function Login() {
    return (
        <View style={estilos.container}>
            <Logo width={240}/>
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

            <Button style={estilos.botao} title="Concluído"/>
            <Text style={estilos.texto}>Já possui conta? <Button></Button>Fazer login</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    titulo: {

    },

    logGoogle: {

    },

    input: {

    },

    botao: {

    }
  });