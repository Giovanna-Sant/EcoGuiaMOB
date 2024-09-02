import React from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../assets/home.svg';
import TrilhaIcon from '../assets/trilha.svg';
import CatalogoIcon from '../assets/catalogo.svg';
import ColetaIcon from '../assets/coleta.svg';
import PerfilIcon from '../assets/perfil.svg';

// Atualize a imagem e o caminho para uma PNG ou JPEG se o SVG não funcionar.
const backgroundImage = require('../assets/footer-background.png'); 

export default function Footer() {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.footer} 
      resizeMode="cover"
    >
      <TouchableOpacity onPress={() => handlePress('Trilha')} style={styles.iconButton}>
        <TrilhaIcon width={24} height={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Catalogo')} style={styles.iconButton}>
        <CatalogoIcon width={24} height={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Home')} style={styles.iconButton}>
        <HomeIcon width={24} height={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Coleta')} style={styles.iconButton}>
        <ColetaIcon width={24} height={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Perfil')} style={styles.iconButton}>
        <PerfilIcon width={24} height={24} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%', // Garante que a imagem ocupe toda a largura da tela
    height: 83,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // Opções adicionais de estilo
    borderRadius: 10, // Se desejar bordas arredondadas
    overflow: 'hidden', // Garante que o arredondamento das bordas se aplique
    opacity: 0.9, // Ajusta a opacidade se necessário
  },
  iconButton: {
    flex: 1, // Garante que os ícones tenham espaço igual
    justifyContent: 'center',
    alignItems: 'center',
  },
});

