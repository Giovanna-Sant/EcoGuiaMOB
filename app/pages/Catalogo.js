import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleCatalogo from '../assets/titleCatalogo.svg';

const Catalogo = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <View style={styles.container}>
    <ScrollView 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header />

      <View style={styles.logoContainer}>
        <TitleCatalogo style={styles.logo} />
        <Text style={styles.description}>
          Encontre toda informação necessária para ter uma vida mais sustentável e um consumo consciente!
        </Text>
      </View>

      <ScrollView 
        horizontal={true} 
        style={styles.filterContainer} 
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'Notícias' ? styles.selected : styles.unselected]}
          onPress={() => handleFilterPress('Notícias')}
        >
          <Text style={[styles.filterText, selectedFilter === 'Notícias' ? styles.selectedText : styles.unselectedText]}>Notícias</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'Artigos' ? styles.selected : styles.unselected]}
          onPress={() => handleFilterPress('Artigos')}
        >
          <Text style={[styles.filterText, selectedFilter === 'Artigos' ? styles.selectedText : styles.unselectedText]}>Artigos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'Materiais Reciclaveis' ? styles.selected : styles.unselected]}
          onPress={() => handleFilterPress('Materiais Reciclaveis')}
        >
          <Text style={[styles.filterText, selectedFilter === 'Materiais Reciclaveis' ? styles.selectedText : styles.unselectedText]}>Materiais Recicláveis</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, selectedFilter === 'Faça você mesmo' ? styles.selected : styles.unselected]}
          onPress={() => handleFilterPress('Faça você mesmo')}
        >
          <Text style={[styles.filterText, selectedFilter === 'Faça você mesmo' ? styles.selectedText : styles.unselectedText]}>Faça você mesmo</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.newsContainer} onPress={() => navigation.navigate('NoticiasPage')}>
        <Image source={{ uri: 'url-da-imagem' }} style={styles.newsImage} />
        <Text style={styles.newsTitle}>Projeto do Einstein de transformação de resíduos impulsiona geração de renda em Paraisópolis</Text>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReciclavelPage')}>
          <Text style={styles.buttonText}>Lista de Materiais Recicláveis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DescartavelPage')}>
          <Text style={styles.buttonText}>Não descarte estes materiais!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

    <Footer />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 83,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {},
  description: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  filterContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  filterButton: {
    display: 'flex',
    width: 'auto',
    height: 30,
    paddingVertical: 1,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: '#4CAF50', // Cor verde para quando o botão está selecionado
  },
  unselected: {
    backgroundColor: '#F1F1F1', // Cor cinza para quando o botão não está selecionado
  },
  selectedText: {
    color: '#FFF', // Texto branco quando o botão está selecionado
  },
  unselectedText: {
    color: '#3F463E', // Texto preto quando o botão não está selecionado
  },
  newsContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  newsImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  newsTitle: {
    marginTop: 10,
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#F1F1F1',
    width: 190,
    height: 150,
    flexShrink: 0, 
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
  },
});

export default Catalogo;
