import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Logo from '../assets/logo.svg'; // Certifique-se de que o SVG é um componente React
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Logo width={120} height={50} style={styles.logo} />
      </View>
      <Pressable style={styles.menuButton} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu-outline" size={28} color="black" />
      </Pressable>
    </View>
  );
};

const CustomDrawerContent = () => {
  return (
    <View style={styles.drawerContent}>
      {/* componentes  */}
      <View></View>
    </View>
  );
};

const SideBar = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right'
      }}
      drawerContent={() => <CustomDrawerContent />} // Define o conteúdo customizado da drawer
    >
      <Drawer.Screen name="Head" component={CustomHeader} />
    </Drawer.Navigator>
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
    right: 20, // Ajuste o valor conforme necessário
    top: 35,
    bottom: 0,
    justifyContent: 'center',
  },
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  drawerText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default SideBar;
