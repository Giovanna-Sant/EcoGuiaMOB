import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recicle from '../assets/titleColeta.png'
import RedTruck from '../assets/icons/redTruck.svg'
import EcoPonto from '../assets/icons/blueLocal.svg'

export default function Coleta() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
  });

  const [selectedFilter, setSelectedFilter] = useState(null);

  // Verifique se fontsLoaded está verdadeiro antes de renderizar o componente
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.content}>
        <Image source={Recicle} maxWidth={300} maxHeight={100}/>
        <Text style={styles.description}>Não sabe como reciclar no seu bairro? Aqui, temos informações dinâmicas para te ajudar!</Text>
      
        <View style={styles.api}>
          <RedTruck maxWidth={50} maxHeight={50}/>
          <Text style={styles.subtitle}>Horários de Coleta</Text>
          <Text style={styles.description}>Confira através do seu CEP, quais são os horários e datas que os caminhões de coleta padrão e coleta sustentável passam em sua rua!</Text>
        </View>
        
        <View style={styles.api}>
          <EcoPonto maxWidth={40} maxHeight={40} marginBottom={10}/>
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
    backgroundColor: '#ffffff',
    paddingBottom: 83
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  description: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
  },

  subtitle: {
    fontFamily: 'Poppins_600SemiBold'
  },

  api: {
    alignItems: 'center',
    marginVertical: 10
  }
});