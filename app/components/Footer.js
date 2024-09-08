import React from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from '../assets/icons/home.svg';
import TrilhaIcon from '../assets/icons/trilha.svg';
import CatalogoIcon from '../assets/icons/catalogo.svg';
import ColetaIcon from '../assets/icons/coleta.svg';
import PerfilIcon from '../assets/icons/perfil.svg';

const backgroundImage = require('../assets/backgrounds/footer_bg.png'); 

export default function Footer() {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ImageBackground
      source={backgroundImage} 
      style={styles.footer}
      resizeMode="cover" // Ajusta o modo de redimensionamento da imagem
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
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  iconButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
