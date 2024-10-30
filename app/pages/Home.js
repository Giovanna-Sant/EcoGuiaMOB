import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Collapsible from 'react-native-collapsible'; 
import Footer from '../components/Footer';
import * as Progress from 'react-native-progress';
import { ArrowDown, ArrowRight, CatalogoBG, TrilhaBG, Truck, Local } from '../assets'
import api from '../services/api'
import cache from '../utils/cache'
import getPerfil from '../utils/gerProfile';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const rotateAnim = useRef(new Animated.Value(0)).current; 
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };
  
  const [tip, setTip] = useState([])
  const [user, setUser] = useState({});
  useEffect(() => {
  try {
    getPerfil();
    async function getDados() {
      const resposta = await api.get("/tip");
      setTip(resposta.data);
      setUser(await cache.get("dados"));
    }
    getDados();
  } catch (erro) {
    console.log(erro);
  }
  },
[user]);




  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const toggleCollapse = () => {
    // Alterna o estado de colapso
    setIsCollapsed((prev) => !prev);

    Animated.timing(rotateAnim, {
      toValue: isCollapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateIcon = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

let levelProgress = 0
 if(user){
   levelProgress = user.XP_level > 0 ? (user.XP_user / user.XP_level) : 0;
  }

  return (
    <View style={styles.container}>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        >
        
        <Pressable style={styles.viewPerfil} onPress={() => handlePress('Perfil')}>
          <View style={styles.iconDiv}>
            {user ?(
               <Image style={styles.icon} width={60} height={60} source={{uri:`${user.blob_avatar}`}} />
            ):(
              <Text>Carregando...</Text>
            )}
          </View>
          <View>
          <Text style={styles.subtitle}>{user ? `${user.name_user} ${user.lastname_user}`: "carregando..."}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.text}>{user ? `XP ${user.XP_user}/${user.XP_level}`:"carregando..."}</Text>
            <Text style={styles.textLvl}>{user ?` level ${user.fk_level_user}`: "carregando.."}</Text>
            </View>

            <Progress.Bar
              width={170}
              color="#6BBF59"
              unfilledColor="#EBEBEB"
              borderWidth={1}
              borderColor='#6BBF59'
              height={10}
              borderRadius={5}
              style={styles.progressBar}
              progress={levelProgress}
            />
          </View>

          <View style={styles.badge}>
            <Image width={50} height={60} source={{uri: `${user.blob_badge}`}} />
          </View>
        </Pressable>

        <Pressable onPress={() => handlePress('Trilha')} maxHeight={210} style={styles.viewTrilha}>
          <Image source={TrilhaBG} maxHeight={210} maxWidth='100%' borderRadius={10} />
        </Pressable>

        <Pressable onPress={toggleCollapse} style={styles.viewDica}>
          <Text style={styles.subtitle}>Dica diária</Text>
          <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
            <ArrowDown width={32} height={32} style={styles.abrir} />
          </Animated.View>
        </Pressable>

        <Collapsible collapsed={isCollapsed}>
          <View style={styles.dicaContent}>
            <Text style={styles.dicaText}>{tip.description_tip}</Text>
          </View>
        </Collapsible>

        <Pressable onPress={() => handlePress('Coleta')} style={styles.iconButton}>
          <View style={styles.viewAPI}>
            <View style={styles.contAPI}>
              <Truck/>
              <Text style={styles.atbAPI}>Saiba o horário de colocar seu lixo pra fora!</Text>
            </View>
            <View style={styles.contAPI}>
              <Local/>
              <Text style={styles.atbAPI}>Conheça os pontos de coleta perto de você!</Text>
            </View>
            <ArrowRight/>
          </View>
        </Pressable>

        <Pressable onPress={() => handlePress('Catalogo')} style={styles.viewNews}>
          <Image style={styles.imgNews} source={CatalogoBG} maxWidth='100%' maxHeight={205} />
        </Pressable>

      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    marginHorizontal: 10,
    paddingBottom: 85,
  },

  subtitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },

  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
  },

  viewPerfil: {
    marginTop: 20,
    backgroundColor: '#E2F2DF',
    borderWidth: 0.5,
    borderColor: '#6BBF59',
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconDiv: {
    borderColor: '#A6D89B',
    borderWidth: 3,
    borderRadius: 50,
    padding: 8,
  },
  
  badge: {
    borderRadius: 10,
    borderColor: '#A6D89B',
    borderWidth: 3,
    backgroundColor: '#E2F2DF',
    padding: 5,
  },
  
  progressBar: {
    height: 10,
    marginTop: 8,
  },
  
  textLvl: {
    backgroundColor: '#a6d89b',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 1,
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  
  viewAPI: {
    backgroundColor: '#E2F2DF',
    borderWidth: 0.5,
    borderColor: '#6BBF59',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  
  contAPI: {
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 150,
  },
  
  atbAPI: {
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
  
  viewNews: {
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: -90,
    zIndex: -2
  },
  
  imgNews: {
    borderRadius: 10,
  },
  
  viewDica: {
    backgroundColor: '#E2F2DF',
    borderWidth: 0.5,
    borderColor: '#6BBF59',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  
  abrir: {
    color: '#fff',
    backgroundColor: '#3F463E',
    borderRadius: 50,
  },
  
  viewTrilha: {
    marginVertical: 5,
  },
  
  dicaContent: {
    backgroundColor: '#5EB26C',
    padding: 10,
    borderRadius: 10,
    borderColor: '#E2F2DF',
    borderWidth: 0.5,
    marginVertical: 5,
  },
  
  icon: {
    borderRadius: 50
  },

  dicaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'white',
  },
});

export default Home;