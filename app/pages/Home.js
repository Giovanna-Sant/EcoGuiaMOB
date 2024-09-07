
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as Progress from 'react-native-progress'
import Coleta from '../assets/icons/caminhao.svg'
import EcoPonto from '../assets/icons/local.svg'
import Seta from '../assets/icons/setaDireita.svg'
import News from '../assets/catalogoBackground.png'
import Trilha from '../assets/TrilhaObjetivos.png'
import Abrir from '../assets/icons/arrow-down.svg'

const Home = () => {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <Header />
    <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>

      <Pressable style={styles.viewPerfil} onPress={() => handlePress('Perfil')}>
        <View style={styles.iconDiv}><Image style={styles.icon} width={60} height={60} source={{uri: 'https://cdn-icons-png.flaticon.com/256/903/903482.png'}}></Image></View>
        
        <View>
          <Text style={styles.textNome}>Yasmin Benjor</Text>
          <View style={ {flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
            <Text style={styles.textXp}>XP 120/340</Text>
            <Text style={styles.textLvl}>level 13</Text>
          </View>
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
        {/* Substituir url por variável que traga current img link */}
        </View>
        </Pressable>

        <Pressable onPress={() => handlePress('Trilha')} maxHeight={210} style={styles.viewTrilha}>
          <Image source={Trilha} maxHeight={210} maxWidth={360} borderRadius={10}/>
        </Pressable>

        <View style={styles.viewDica}>
          <Text>Dica diária</Text>
          <Pressable><Abrir width={32} height={32} style={styles.abrir}/></Pressable>
        </View>

        <Pressable onPress={() => handlePress('Coleta')} style={styles.iconButton}>
          <View style={styles.viewAPI}>
            <View style={styles.contAPI}>
              <Coleta/>
              <Text style={styles.atbAPI}>Saiba o horário de colocar seu lixo pra fora!</Text>
            </View>
            <View style={styles.contAPI}>
              <EcoPonto/>
              <Text style={styles.atbAPI}>Conheça os pontos de coleta perto de você!</Text>
            </View>
            <Seta/>
          </View>
        </Pressable>

        <Pressable onPress={() => handlePress('Catalogo')} style={styles.viewNews}>
          <Image style={styles.imgNews} source={News} maxWidth={360} maxHeight={205}/>
        </Pressable>
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
    marginHorizontal: 10,
    paddingBottom: 85,
  },
  
  viewPerfil: {
    marginTop: 20,
    backgroundColor: '#E2F2DF',
    borderWidth: 0.5,
    borderColor: '#6BBF59',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 5,
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
    },
    
    viewAPI: {
      backgroundColor: '#E2F2DF',
      borderWidth: 0.5,
      borderColor: '#6BBF59',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      paddingVertical: 15,
    },

    contAPI: {
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: 150,
    },
    
    atbAPI: {
      textAlign: 'center',
      marginTop: 8
    },
    
    viewNews: {
      borderRadius: 10,
      justifyContent: 'center',
      marginVertical: -90,
      
    },

    imgNews: {
      borderRadius: 10,
    },

    viewDica: {
      backgroundColor: '#E2F2DF',
      borderWidth: 0.5,
      borderColor: '#6BBF59',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      marginVertical: 5,
      alignItems: 'center'
    },

    abrir: {
      color: '#fff',
      backgroundColor: '#3F463E',
      borderRadius: 50,
    },

    viewTrilha: {
      marginVertical: 5,

    },
});

export default Home;