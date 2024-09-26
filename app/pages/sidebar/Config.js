import React from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, Pressable, TouchableOpacity } from "react-native"
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Seta from '../../assets/icons/arrowRight.svg';
import Detail from '../../assets/backgrounds/detail.png'
import Header from "../../components/Header";

const Config = () => {
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
        <Header/>
      <View style={styles.content}>
        <Text style={styles.titulo}>Configurações da Conta</Text>
        <View style={styles.divPerfil} >
            <View style={styles.iconDiv}><Image width={40} height={40} source={{uri: 'https://cdn-icons-png.flaticon.com/256/903/903482.png'}}></Image></View>
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
            <Pressable style={styles.operacao}>
            <Text style={styles.txtOperacao}>Alterar E-mail</Text>
            <Seta/>
            </Pressable>
            <Pressable style={styles.operacao}>
            <Text style={styles.txtOperacao}>Alterar Senha</Text>
            <Seta/>
            </Pressable>
            <Pressable style={styles.operacao}>
            <Text style={styles.txtOperacao}>Deletar Conta</Text> 
            <Seta/>
            </Pressable>
        </View>
        <Image source={Detail} style={styles.detalhe}></Image>
      </View>
    </ScrollView>
  );
};

export default Config

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

    // Fontes
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
    }
})