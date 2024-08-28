import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Logo from './app/assets/logo.svg'

export default function App() {
  return (
    <View style={estilos.container}>
      <StatusBar style="auto" />
      <Text>Oi Dev!</Text>
      <Logo />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
