import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, Linking } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

const NoticiasPage = ({ route }) => {
  const { article } = route.params;

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('pt-BR', { month: 'long' });
  
    return `${day} de ${month} de ${year}`;
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.newsContainer}>
          {/*Imagem*/ }
        <Image style={styles.newsImage} source={{ uri: article.image_article }}
        />
          <View style={styles.newsTextContainer}>
            {/*Titulo*/ }
            <Text style={styles.newsTitle}>{article.title_article}</Text>

            {/*Fonte*/ }
            <Text style={styles.newsSubtitle} onPress={() => Linking.openURL(article.reference_article)}>{article.reference_article || 'Autor Desconhecido'}</Text>

            {/*Data*/ }
            <Text style={styles.newsDate}>{formatDate(article.date_article) || 'Data Desconhecida'}</Text>
          </View>
        </View>

        <View style={styles.newsContentContainer}>
          {/*Conteúdo/Descrição*/ }
          <Text style={styles.newsContent}>{article.description_article || 'Conteúdo não disponível.'}</Text>
        </View>
      </ScrollView>
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
  },
  newsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start', 
    marginTop: 20,
    marginHorizontal: 10, 
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
    fontFamily: 'Poppins_500Medium', 
  },
  newsSubtitle: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
    textDecorationLine: 'underline'
  },

  newsDate: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins_400Regular',
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
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
    lineHeight: 22, 
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoticiasPage;