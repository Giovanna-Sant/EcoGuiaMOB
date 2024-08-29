import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Logo from './app/assets/logo.svg'
import { Header } from './app/components/Header';
import {PagesResiduos} from './app/pages/PagesResiduos'

export default function App() {
  return (
    <View style={estilos.container}>
      <StatusBar style="auto" />
      <Header/>
      
    </View>
  );
}

const estilos = StyleSheet.create({
  
});
