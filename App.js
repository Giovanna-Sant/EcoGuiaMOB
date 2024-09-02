import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Logo from './app/assets/logo.svg'
import Login from './app/pages/Login';


export default function App() {
  return (
    <View style={estilos.container}>
      <StatusBar style="auto" />
      <Login />
    </View>
  );
}

const estilos = StyleSheet.create({
  
});
