
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as Progress from 'react-native-progress'

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.viewPerfil}>
        <View style={styles.iconDiv}><Image style={styles.icon} width={60} height={60} source={{uri: 'https://cdn-icons-png.flaticon.com/256/903/903482.png'}}></Image></View>
        
        <View>
          <Text style={styles.textNome}>Yasmin Benjor</Text>
          <Text style={styles.textXp}>XP 120/340</Text>
          <Text style={styles.textLvl}>level 13</Text>
          
          <Progress.Bar
            width={170}
            color="#6BBF59"
            unfilledColor="#EBEBEB"
            borderWidth={1}
            borderColor='#6BBF59'
            height={10}
            borderRadius={5}
            style={styles.progressBar}
            progress={0.6}
          />
          {/* Adicionar lógica para converter valor atual e xp necessário para o próximo, convertendo para um número de 0 a 1 que será o responsável para o atriburo de progress*/}
        </View>

        <View style={styles.badge}>
          <Image width={50} height={60} source={{uri: 'https://th.bing.com/th/id/OIP.KgtLpFEUvAR0-jhXUGG-pgHaHa?w=512&h=512&rs=1&pid=ImgDetMain'}}></Image>
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
    paddingBottom: 80
  },
  
  viewPerfil: {
    backgroundColor: '#E2F2DF',
    borderWidth: 0.5,
    borderColor: '#6BBF59',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  text: {
    fontSize: 18,
  },

  iconDiv: {
      borderColor: '#A6D89B',
      backgroundColor: '#F1F1F1',
      borderWidth: 3,
      borderRadius: 50,
      padding: 8
    },
    
    badge: {
      borderRadius: 10,
      borderColor: '#A6D89B',
      borderWidth: 3,
      backgroundColor: '#E2F2DF',
      padding: 5
    },

    progressBar: {
      height: 10,
      marginTop: 8,
    },

    textLvl: {
      backgroundColor: '#a6d89b',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  }
});

export default Home;

