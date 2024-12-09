import { View,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

const Mapa = () => {
    
    // Navegação de páginas
    const navigation = useNavigation();

    // Aplicação
    return (
      <View style={styles.container}>
         <WebView
           source={{html: '<iframe src="https://www.google.com/maps/d/embed?mid=1Kok7L5JyjXN758y3vy3kMsKYdJylrQE&hl=pt-BR&ehbc=2E312F" width="100%" height="100%"></iframe>'}}
           style={styles.iframe}
        />
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      justifyContent: "center",
      alignItems: "center",
    },
    iframe:{
      alignItems: 'center',
      width:430,
      marginTop: 40,
      marginBottom:40
    }
    })
  
export default Mapa