import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Logo from '../assets/logo.svg';
import { useNavigation } from '@react-navigation/native';

const Header = ({ onMenuPress, showBackButton }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack(); // Volta para a página anterior
    } else {
      navigation.navigate('Home'); // Caso não tenha uma página anterior, vai para Home
    }
  };

  const handlePress = (screen) => {
    navigation.navigate(screen); // Navega para a tela de configuração quando o ícone de menu for clicado
  };

  return (
    <View style={styles.header}>
      <StatusBar style="auto" />

      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={28} color="black" />
        </TouchableOpacity>
      )}

      <View style={styles.logoContainer}>
        <Logo width={120} height={50} style={styles.logo} onPress={() => navigation.navigate('Home')} />
      </View>

      <TouchableOpacity onPress={() => handlePress('Config')} style={styles.menuButton}>
        <Ionicons name="menu-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 95,
    paddingTop: 45,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 4,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    top: 35,
    bottom: 0,
    justifyContent: 'center',
  },
  menuButton: {
    position: 'absolute',
    right: 20,
    top: 35,
    bottom: 0,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 35,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default Header;
