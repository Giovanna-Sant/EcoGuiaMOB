import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import Footer from '../components/Footer';
import { TitleColeta, RedTruck, BlueLocal } from '../assets';

export default function Coleta() {
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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.content}>
      <TitleColeta maxWidth={300} maxHeight={100}/>
        <Text style={styles.description}>Não sabe como reciclar no seu bairro? Aqui, temos informações dinâmicas para te ajudar!</Text>
      
        <View style={styles.api}>
          <RedTruck maxWidth={50} maxHeight={50}/>
          <Text style={styles.subtitle}>Horários de Coleta</Text>
          <Text style={styles.description}>Confira através do seu CEP, quais são os horários e datas que os caminhões de coleta padrão e coleta sustentável passam em sua rua!</Text>
        </View>
        
        <View style={styles.api}>
          <BlueLocal maxWidth={40} maxHeight={40} marginBottom={10}/>
          <Text style={styles.subtitle}>Localização de EcoPontos</Text>
          <Text style={styles.description}>Acesse os pontos de coleta mais próximos de você! Use para descartar entulho de forma correta e consciente!</Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 85,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  description: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  subtitle: {
    fontFamily: "Poppins_600SemiBold",
  },

  api: {
    alignItems: "center",
    marginVertical: 10,
  },
});