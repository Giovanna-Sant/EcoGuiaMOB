import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TitleCatalogo from '../assets/titleCatalogo.svg';
import Recicla from '../assets/icons/Recicla.svg';
import Lixo from '../assets/icons/Lixo.svg';
import Imgnews from '../assets/imgnews.svg'

const Catalogo = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >

        <View style={styles.logoContainer}>
          <TitleCatalogo style={styles.logo} />
          <Text style={styles.description}>
            Encontre toda informação necessária para ter uma vida mais sustentável e um consumo consciente!
          </Text>
        </View>

        {/* Filtro */}
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

        {/* Notícia */}
        <TouchableOpacity style={styles.newsContainer} onPress={() => navigation.navigate('NoticiasPage')}>
        <Imgnews width={370} height={200}  style={styles.newsImage} />
          <Text style={styles.newsTitle}>Projeto do Einstein de transformação de resíduos impulsiona geração de renda em Paraisópolis</Text>
        </TouchableOpacity>

        {/* Lista de Materiais */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReciclavelPage')}>
            <Recicla/>
            <Text style={styles.buttonText}>Lista de Materiais Recicláveis.</Text>
            <Text style={styles.buttonDescription}>Confira e descubra.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DescartavelPage')}>
            <Lixo  />
            <Text style={styles.buttonText}>Não descarte estes materiais!</Text>
            <Text style={styles.buttonDescription}>Veja e aprenda.</Text> 
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
   
  },
  scrollContent: {
    paddingHorizontal: 10, // Margem geral horizontal
    paddingVertical: 20, // Margem geral vertical (equivalente ao gap)
    paddingBottom: 60,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
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
    marginBottom: 20,
  },
  filterButton: {
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
    backgroundColor: '#4CAF50',
  },
  unselected: {
    backgroundColor: '#F1F1F1',
  },
  selectedText: {
    color: '#FFF',
  },
  unselectedText: {
    color: '#3F463E',
  },
  newsContainer: {
   
    borderRadius: 5,
    backgroundColor: '#E2F2DF',
    elevation: 2,
    marginBottom: 20,
    padding: 10,

  },
  newsImage: {
    borderRadius: 5,
  },
  newsTitle: {
    marginTop: 10,

    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins', // Certifique-se de que a fonte Poppins está carregada e registrada
    fontStyle: 'normal', // 'normal' é o valor padrão, pode ser omitido
    fontWeight: '500',

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: '#F1F1F1',
    width: 190,
    height: 180,
    borderRadius: 5,
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10,
    elevation: 2,


  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins', // Certifique-se de que a fonte Poppins está carregada e registrada
    fontStyle: 'normal', // 'normal' é o valor padrão, pode ser omitido
    fontWeight: '600',
    // lineHeight: 18,
  },
  buttonDescription: {
    color: '#3F463E',
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins', // Certifique-se de que a fonte Poppins está carregada e registrada
    fontStyle: 'normal', // 'normal' é o valor padrão, pode ser omitido
    fontWeight: '500',
    // lineHeight: 18,
  },
});

export default Catalogo;
