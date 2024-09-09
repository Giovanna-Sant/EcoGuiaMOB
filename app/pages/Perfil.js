import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Progress from 'react-native-progress'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seta from '../assets/icons/arrowRight.svg'
import Edit from '../assets/icons/edit.svg'

const Perfil = () => {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

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
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View>
        <View style={styles.viewPerfil}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity>
              <Edit maxHeight={24} maxWidth={24}/>
            </TouchableOpacity>
            <Text style={styles.subtitle}>yasmin#3244</Text>
            <TouchableOpacity>
              <Ionicons name="menu-outline" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
          <View style={styles.iconDiv}>
            <Image
              style={styles.icon}
              width={60}
              height={60}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/256/903/903482.png",
              }}
            ></Image>
          </View>
          <View>
            <Text style={styles.subtitle}>Yasmin Benjor</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.text}>XP 120/340</Text>
              <Text style={styles.textLvl}>level 13</Text>
            </View>
            <Progress.Bar
              width={170}
              color="#6BBF59"
              unfilledColor="#EBEBEB"
              borderWidth={1}
              borderColor="#6BBF59"
              height={10}
              borderRadius={5}
              style={styles.progressBar}
              progress={0.6}
            />
            {/* Adicionar lógica para converter valor atual e xp necessário para o próximo, convertendo para um número de 0 a 1 que será o responsável para o atriburo de progress*/}
          </View>
        </View>
        </View>
        </View>
        <Pressable style={styles.viewBadge} onPress={() => handlePress('Trilha')}>
          <View style={styles.badge}>
            <Image
              width={70}
              height={80}
              source={{
                uri: "https://th.bing.com/th/id/OIP.KgtLpFEUvAR0-jhXUGG-pgHaHa?w=512&h=512&rs=1&pid=ImgDetMain",}}></Image>
            {/* Substituir url por variável que traga current img link da badge*/}
          </View>
          <View>
            <Text style={styles.subtitle}>Árvore Iniciante</Text>
            <Text style={styles.text}>Você está indo bem, continue assim para evoluir!</Text>
            <Pressable style={styles.botao}><Text style={styles.textBotao}>Ver Trilha de Objetivos</Text><Seta maxWidth={12} maxHeight={12}/></Pressable>
          </View>
        </Pressable>
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
  },

  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },

  text: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },

  viewPerfil: {
    paddingTop: 20,
    backgroundColor: "#F1F1F1",
    borderWidth: 0.5,
    borderColor: "#919890",
    borderRadius: 10,
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
    alignItems: 'center',
    maxWidth: "100%"
  },

  iconDiv: {
    borderColor: "#A6D89B",
    backgroundColor: "#F1F1F1",
    borderWidth: 3,
    borderRadius: 50,
    padding: 8,
  },

  badge: {
    borderRadius: 10,
    borderColor: "#6BBF59",
    borderWidth: 2,
    backgroundColor: "#F1F1F1",
    padding: 5,
  },

  progressBar: {
    height: 10,
    marginTop: 8,
  },

  textLvl: {
    backgroundColor: "#a6d89b",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },

  botao: {
    backgroundColor: '#E2F2DF',
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textBotao: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: "#3F463E",
    paddingRight: 8
  },

  viewBadge: {
    flexDirection: 'row',
    gap: 10
  }
});

export default Perfil;
