import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import Imgnews from '../assets/imgnews.svg';
import Footer from '../components/Footer'; // Supondo que o footer seja um componente já existente

const NoticiasPage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.newsContainer}>
          <Imgnews width={'100%'} height={200} style={styles.newsImage} />
          <View style={styles.newsTextContainer}>
            <Text style={styles.newsTitle}>Projeto do Einstein de transformação de resíduos impulsiona geração de renda em Paraisópolis</Text>
            <Text style={styles.newsSubtitle}>Por Gabriella Soares, EcoGuia - São Paulo</Text>
            <Text style={styles.newsDate}>7 de agosto de 2024</Text>
          </View>
        </View>

        <View style={styles.newsContentContainer}>
          <Text style={styles.newsContent}>
            O projeto Design Sustentável, feito pelo Hospital Einstein e Programa Einstein na Comunidade de Paraisópolis (PECP) em parceria com a Poiato Recicla, usina de reciclagem de bitucas do Brasil, formou sua primeira turma de mulheres em Paraisópolis, composta por 32 alunas. A iniciativa foi idealizada com o intuito de transformar resíduos, como cimento estrutural, argamassa e bitucas de cigarro em peças de design, reduzindo o impacto ambiental e promovendo a geração de renda.
          </Text>
          <Text style={styles.newsContent}>
            O projeto Design Sustentável, feito pelo Hospital Einstein e Programa Einstein na Comunidade de Paraisópolis (PECP) em parceria com a Poiato Recicla, usina de reciclagem de bitucas do Brasil, formou sua primeira turma de mulheres em Paraisópolis, composta por 32 alunas. A iniciativa foi idealizada com o intuito de transformar resíduos, como cimento estrutural, argamassa e bitucas de cigarro em peças de design, reduzindo o impacto ambiental e promovendo a geração de renda.
          </Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 40, 
  },
  newsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start', 
    marginTop: 20,
    marginHorizontal: 10, // Adiciona margem horizontal para alinhamento com o título
    borderRadius: 5,
    marginBottom: 20,
  },
  newsImage: {
    width: '100%', 
    height: 200,
    borderRadius: 5, 
  },
  newsTextContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  newsTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins', 
    fontStyle: 'normal', 
    fontWeight: '500',
  },
  newsSubtitle: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: 5,
  },
  newsDate: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    marginTop: 5,
  },
  newsContentContainer: {
    borderRadius: 20, 
    padding: 10,
    marginHorizontal: 10, 
    backgroundColor: '#F1F1F1',
  },
  newsContent: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: 10,
    lineHeight: 22, 
  },
});

export default NoticiasPage;
