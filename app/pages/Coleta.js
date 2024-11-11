import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Footer from '../components/Footer';
import { TitleColeta, RedTruck, BlueLocal } from '../assets';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Coleta = ({ navigation }) => {

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >

        <View style={styles.logoContainer}>
          <TitleColeta />
          <Text style={styles.description}>
            Não sabe como reciclar no seu bairro? Aqui, temos informações dinâmicas para te ajudar!
          </Text>
        </View>

        <TouchableOpacity style={styles.newsContainer} onPress={() => navigation.navigate('Horarios')}>
          <RedTruck maxWidth={50} maxHeight={40} marginBottom={10} />
          <Text style={styles.subtitle}>Horários de Coleta</Text>
          <Text style={styles.text}>
            Confira através do seu CEP, quais são os horários e datas que os caminhões de coleta padrão e coleta sustentável passam em sua rua!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newsContainer} onPress={() => navigation.navigate('Mapa')}>
          <BlueLocal maxWidth={50} maxHeight={40} marginBottom={10}/>
          <Text style={styles.subtitle}>Mapa de EcoPontos</Text>
          <Text style={styles.text}>
            Acesse os pontos de coleta mais próximos de você! Use para descartar entulho de forma correta e consciente!
          </Text>
        </TouchableOpacity>

      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 75,
  },

  logoContainer: {
    alignItems: "center",
  },

  description: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.04,  
    lineHeight: width * 0.05,  
    marginTop: height * 0.02,  
    paddingHorizontal: width * 0.05,  
  },

  newsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.05,  
    borderRadius: 5,
    marginBottom: height * 0.02, 
    marginTop: height * 0.02,  
    backgroundColor: "white",
    elevation: 2,
    borderColor: '#A6D89B',
    borderWidth: 0.5,
  },

  subtitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: width * 0.045,  
    marginVertical: height * 0.015,  
  },

  text: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.035,  
    lineHeight: width * 0.045, 
    paddingHorizontal: width * 0.05,  
  },
});

export default Coleta;
