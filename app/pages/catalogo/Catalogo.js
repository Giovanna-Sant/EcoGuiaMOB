import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Image, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import { Lixo, Recicla, TitleCatalogo } from '../../assets';
import api from '../../services/api';

const { width, height } = Dimensions.get('window');

const Catalogo = ({ navigation }) => {

  const [selectedFilter, setSelectedFilter] = useState('Todos'); // Filtro fixado ao acessar a tela
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Faz o carregamento de mais artigos
  const [totalArticles, setTotalArticles] = useState(0); // Total de artigos disponíveis
  const [loadedArticlesCount, setLoadedArticlesCount] = useState(0); // Contador de artigos carregados

  // Faz o mapeamento da categoria selecionada no filtro e busca no banco de dados
  const filterMapping = {
    'Todos': null,
    'Notícias': 'Notícia',
    'Artigos': 'Artigo',
    'Faça você mesmo': 'Faça você mesmo',
  };

  // Manipula a seleção de filtros
  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    const mappedValue = filterMapping[filter];

    // Filtra os artigos de acordo com a categoria selecionada
    if (mappedValue === null) {
      setFilteredArticles(articles);
    } else {
      const newFilteredArticles = articles.filter(article => article.category_article === mappedValue);
      setFilteredArticles(newFilteredArticles);
    }
  };

  const fetchArticles = async () => {
    try {
      const resposta = await api.get("/articles");

      // Ordena os artigos pelo ID em ordem decrescente
      const sortedArticles = resposta.data.sort((a, b) => b.pk_IDarticle - a.pk_IDarticle);

      setTotalArticles(sortedArticles.length);
      setArticles(sortedArticles.slice(0, 4)); // Carrega as primeiras 4 notícias
      setFilteredArticles(sortedArticles.slice(0, 4)); // Inicia o filtro
      setLoadedArticlesCount(4);
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreArticles = async () => {
    if (loadedArticlesCount < totalArticles && !loadingMore) {
      setLoadingMore(true);
      setTimeout(async () => {
        const resposta = await api.get("/articles");
        const newArticles = resposta.data
          .sort((a, b) => b.pk_IDarticle - a.pk_IDarticle)
          .slice(loadedArticlesCount, loadedArticlesCount + 4); // Carrega os próximos 4 artigos da tabela

        if (newArticles.length > 0) {
          const updatedArticles = [...articles, ...newArticles];
          setArticles(updatedArticles);

          // Atualiza de acordo com o filtro selecionado
          if (selectedFilter === 'Todos') {
            setFilteredArticles(updatedArticles);
          } else {
            const newFilteredArticles = updatedArticles.filter(article => article.category_article === filterMapping[selectedFilter]);
            setFilteredArticles(newFilteredArticles);
          }

          setLoadedArticlesCount(prevCount => prevCount + newArticles.length);
        }

        setLoadingMore(false);
      }, 1500);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // formatação de data dos artigos
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('pt-BR', { month: 'long' });
  
    return `${day} de ${month} de ${year}`;
  };

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
        data={filteredArticles}
        keyExtractor={(item) => item.pk_IDarticle.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.logoContainer}>
              <TitleCatalogo />
              <Text style={styles.description}>
                Encontre toda informação necessária para ter uma vida mais sustentável e um consumo consciente!
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              style={styles.filterContainer}
              showsHorizontalScrollIndicator={false}
            >
              {['Todos', 'Notícias', 'Artigos', 'Faça você mesmo'].map((filter) => (
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
                <Text style={styles.newsDate}>{formatDate(item.date_article)}</Text>
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
        onEndReached={loadMoreArticles} // Carrega mais 4 artigos quando chega no final da rolagem
        onEndReachedThreshold={0.5} // Distância para acionar o carregamento mais
        ListFooterComponent={loadingMore && <ActivityIndicator size="large" color="#0000ff" />}
        contentContainerStyle={styles.scrollContent}
      />

 
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
    marginVertical: 20,
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
    marginBottom: 25,
  },

  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 8,
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
    padding: 12,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    elevation: 2,
    marginBottom: 20,
    width: '100%',
  },

  newsDate: {
    fontSize: 12,
    color: "#3F463E",
    fontFamily: "Poppins_500Medium",
  },

  newsCategory: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    backgroundColor: '#E2F2DF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },

  newsImage: {
    borderRadius: 5,
    width: '100%',
    height: height * 0.25,
    resizeMode: 'cover',
    marginVertical: 12
  },

  newsTitle: {
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