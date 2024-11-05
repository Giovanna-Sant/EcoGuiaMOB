import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Image, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import Footer from '../../components/Footer';
import { Lixo, Recicla, TitleCatalogo } from '../../assets';
import api from '../../services/api';

const { width, height } = Dimensions.get('window');

const Catalogo = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    const getArticles = async () => {
      try {
        const resposta = await api.get("/articles");
        setArticles(resposta.data);
      } catch (erro) {
        console.log(erro);
      } finally {
        setLoading(false);
      }
    };
    
    getArticles();
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.pk_IDarticle.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.logoContainer}>
              <TitleCatalogo />
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
              {['Inicial', 'Notícias', 'Artigos', 'Faça você mesmo'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterButton, selectedFilter === filter ? styles.selected : styles.unselected]}
                  onPress={() => handleFilterPress(filter)}
                >
                  <Text style={[styles.filterText, selectedFilter === filter ? styles.selectedText : styles.unselectedText]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        }
        renderItem={({ item, index }) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.newsContainer}
                onPress={() => navigation.navigate('NoticiasPage', { article: item })}
              >
                <Text style={styles.newsCategory}>{item.category_article}</Text>
                <Image
                  style={styles.newsImage}
                  source={{ uri: item.image_article }}
                />
                <Text style={styles.newsDate}>{item.date_article}</Text>
                <Text style={styles.newsTitle}>{item.title_article}</Text>
              </TouchableOpacity>

              {index === 0 && (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReciclavelPage')}>
                    <Recicla />
                    <Text style={styles.buttonText}>Lista de Materiais Recicláveis.</Text>
                    <Text style={styles.buttonDescription}>Confira e descubra.</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DescartavelPage')}>
                    <Lixo />
                    <Text style={styles.buttonText}>Não descarte estes materiais!</Text>
                    <Text style={styles.buttonDescription}>Veja e aprenda.</Text> 
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
        contentContainerStyle={styles.scrollContent}
      />

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 75,
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  description: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.04,
    lineHeight: width * 0.05,
    marginTop: 10,
    paddingHorizontal: 20,
  },

  filterContainer: {
    marginBottom: 20,
  },

  filterButton: {
    height: height * 0.05,
    paddingVertical: 1,
    paddingHorizontal: width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginRight: 10,
  },

  filterText: {
    fontSize: width * 0.035,
    fontFamily: "Poppins_400Regular",
  },

  selected: {
    backgroundColor: "#4CAF50",
  },

  unselected: {
    backgroundColor: "#F1F1F1",
  },

  selectedText: {
    color: "#FFF",
    paddingHorizontal: 5,
  },

  unselectedText: {
    color: "#3F463E",
    paddingHorizontal: 5,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#F1F1F1",
    width: "48%",
    height: height * 0.25,
    borderRadius: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
    elevation: 2,
  },

  buttonText: {
    fontSize: width * 0.04,
    color: "#000",
    fontFamily: "Poppins_500Medium",
    fontWeight: "600",
  },

  buttonDescription: {
    color: "#3F463E",
    fontSize: width * 0.03,
    fontFamily: "Poppins_400Regular",
    fontWeight: "500",
  },

  newsContainer: {
    padding: 1,
    borderRadius: 5,
    backgroundColor: "#E2F2DF",
    elevation: 2,
    marginBottom: 20,
    width: '100%',
  },

  newsCategory: {
    marginLeft: 15,
    padding: 8,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    width: '100%',
    justifyContent: "center"
  },

  newsImage: {
    borderRadius: 5,
    width: '100%',
    height: height * 0.25,
    resizeMode: 'cover',
  },

  newsTitle: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: width * 0.04,
    color: "#000",
    fontFamily: "Poppins_500Medium",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Catalogo;