import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Logo from '../assets/logo.svg'; // Certifique-se de que o SVG é um componente React

export function Header({ onMenuPress }: { onMenuPress: () => void }) {
  return (
    <View style={styles.header}>
      {/* O logo está centralizado na View */}
      <View style={styles.logoContainer}>
        <Logo width={120} height={50} style={styles.logo} />
      </View>
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu-outline" size={28} color="black" />
      </TouchableOpacity> 
    </View>
  );
}

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
    position: 'relative', // Necessário para o alinhamento absoluto do logo
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
    left: 330,
    right: 0,
    alignItems: 'center',
    top: 35,
    bottom: 0,
    justifyContent: 'center',
  },
});
