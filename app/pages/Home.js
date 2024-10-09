import React, { useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator, Animated, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Collapsible from 'react-native-collapsible'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as Progress from 'react-native-progress';
import Coleta from '../assets/icons/truck.svg';
import EcoPonto from '../assets/icons/local.svg';
import Seta from '../assets/icons/arrowRight.svg';
import News from '../assets/backgrounds/catalogo_bg.png';
import Trilha from '../assets/backgrounds/trilha_bg.png';
import Abrir from '../assets/icons/arrowDown.svg'; 
import api from '../services/api'
import cache from '../utils/cache'
import getPerfil from '../utils/gerProfile';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); 
  const rotateAnim = useRef(new Animated.Value(0)).current; 
  const navigation = useNavigation();

  const [tip,setTip] = useState([])
  useEffect(() => {

  try{
      async function getTip(){
      const resposta = await api.get('/tips');
      setTip(resposta.data);
    };
     getTip(); 
    }catch(erro){
    console.log(erro)
  }
  },
[]);

const [refresh,setRefresh]  = useState(false)

const [user, setUser] = useState({});
useEffect(() => {
  try{
  getPerfil()
  async function lerUser(){
  setUser(await cache.get("dados")) 
  };
  lerUser();
}catch(erro){
  console.log(erro)
}
},
[]);




  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold,
  });

  // Verifica se as fontes estão carregadas antes de renderizar
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

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

  return (
    <View style={styles.container}>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        
        <Pressable style={styles.viewPerfil} onPress={() => handlePress('Perfil')}>
          <View style={styles.iconDiv}>
            <Image style={styles.icon} width={60} height={60} source={{uri: 'https://cdn-icons-png.flaticon.com/256/903/903482.png'}} />
          </View>
          <View>
            <Text style={styles.subtitle}>{user.name_user} {user.lastname_user}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.text}>XP {user.XP_user}/{user.XP_level}</Text>
              <Text style={styles.textLvl}>level {user.fk_level_user}</Text>
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
              progress={0.6}
            />
          </View>

          <View style={styles.badge}>
            <Image width={50} height={60} source={{uri: 'https://th.bing.com/th/id/OIP.KgtLpFEUvAR0-jhXUGG-pgHaHa?w=512&h=512&rs=1&pid=ImgDetMain'}} />
          </View>
        </Pressable>

        <Pressable onPress={() => handlePress('Trilha')} maxHeight={210} style={styles.viewTrilha}>
          <Image source={Trilha} maxHeight={210} maxWidth='100%' borderRadius={10} />
        </Pressable>

        <Pressable onPress={toggleCollapse} style={styles.viewDica}>
          <Text style={styles.subtitle}>Dica diária</Text>
          <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
            <Abrir width={32} height={32} style={styles.abrir} />
          </Animated.View>
        </Pressable>

        <Collapsible collapsed={isCollapsed}>
  <View style={styles.dicaContent}>
    <Text style={styles.dicaText}>
      {tip.description_tip}
    </Text>
  </View>
</Collapsible>


        <Pressable onPress={() => handlePress('Coleta')} style={styles.iconButton}>
          <View style={styles.viewAPI}>
            <View style={styles.contAPI}>
              <Coleta />
              <Text style={styles.atbAPI}>Saiba o horário de colocar seu lixo pra fora!</Text>
            </View>
            <View style={styles.contAPI}>
              <EcoPonto />
              <Text style={styles.atbAPI}>Conheça os pontos de coleta perto de você!</Text>
            </View>
            <Seta />
          </View>
        </Pressable>

        <Pressable onPress={() => handlePress('Catalogo')} style={styles.viewNews}>
          <Image style={styles.imgNews} source={News} maxWidth='100%' maxHeight={205} />
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
    backgroundColor: '#F1F1F1',
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
  dicaText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'white',
  },
});

export default Home;
