  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
  import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
  import { useNavigation } from '@react-navigation/native';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import * as Progress from 'react-native-progress';
  import Footer from '../components/Footer';
  import { ArrowRight, Edit } from '../assets';
  import cache from '../utils/cache'
  import api from '../services/api';


  const Perfil = () => {
  
  const navigation = useNavigation();
  
  const [user, setUser] = useState({});
  useEffect(() => {
    async function lerUser(){
    setUser(await cache.get("dados")) 
    };
    lerUser();
  },
[]);


    const [isModalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handlePress = (screen) => {
      navigation.navigate(screen);
    };

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const handleSave = () => {
      // Aqui você pode adicionar lógica para salvar as informações do perfil
      toggleModal();
    };

    const handleIconSelect = (index) => {
      setSelectedIcon(index);
    };

    // Carregamento das fontes
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
      return (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.viewPerfil}>
            {/* Informações do Perfil */}
            <View style={styles.viewPerfilInfos}>
              <TouchableOpacity onPress={toggleModal}>
                <Edit maxHeight={24} maxWidth={24} />
              </TouchableOpacity>

              <Text style={styles.username}>{user.nickname_user}</Text>
              
              <TouchableOpacity onPress={() => handlePress('Config')}>
                <Ionicons name="menu-outline" size={28} color="black" />
              </TouchableOpacity>
            </View>

            {/* Detalhes do Perfil */}
            <View style={styles.profileDetails}>
              <View style={styles.iconDiv}>
                <Image
                  style={styles.icon}
                  width={60}
                  height={60}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/256/903/903482.png",
                  }}
                />
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.subtitle}>{user.name_user} {user.lastname_user}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 200 }}>
                  <Text style={styles.textxp}>XP {user.XP_user}/{user.XP_level}</Text>
                  <Text style={styles.textLvl}>level {user.fk_level_user}</Text>
                </View>
                <Progress.Bar
                  width={200}
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
            </View>
          </View>

          {/* Botão da Trilha */}
          <View style={styles.viewBadge}>
            <View style={styles.badge}>
              <Image
                width={70}
                height={80}
                source={{
                  uri: "https://th.bing.com/th/id/OIP.KgtLpFEUvAR0-jhXUGG-pgHaHa?w=512&h=512&rs=1&pid=ImgDetMain",
                }}
              />
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.subtitle2}>Árvore Iniciante</Text>
              <Text style={styles.text}>Você está indo bem, continue assim para evoluir!</Text>
              <Pressable style={styles.botao} onPress={() => handlePress('Trilha')}>
                <Text style={styles.textBotao}>Ver Trilha de Objetivos</Text>
                <ArrowRight maxWidth={12} maxHeight={12} />
              </Pressable>
            </View>
          </View>
          
        </View>
        <Footer />

        {/* Modal de Edição do Perfil */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.labelModal}>Nome:</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.labelModal}>Sobrenome:</Text>
              <TextInput
                style={styles.input}
                value={sobrenome}
                onChangeText={setSobrenome}
              />

              <View style={styles.iconGrid}>
                {[...Array(9)].map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.iconCircle,
                      selectedIcon === index && styles.selectedIcon,
                    ]}
                    onPress={() => handleIconSelect(index)}
                  >
                    <Text style={styles.iconText}>{index + 1}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <Pressable style={styles.confirmButton} onPress={handleSave}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={toggleModal}>
                  <Text style={styles.buttonTextConfir}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingBottom: 85,
    },

    content: {
      flex: 1,
    },

    viewPerfil: {
      paddingTop: 35,
      paddingBottom: 15,
      backgroundColor: "#F1F1F1",
      borderRadius: 20,
      padding: 10,
      elevation: 5,
      alignItems: 'center',
      maxWidth: "100%",
      paddingHorizontal: 20,
    },

    viewPerfilInfos: {
      width: '100%',
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
    },

    profileDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10, 
      marginLeft: 20,
    },

    profileInfo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingHorizontal: 10,
    },

    iconDiv: {
      borderColor: "#A6D89B",
      backgroundColor: "#F1F1F1",
      borderWidth: 3,
      borderRadius: 50,
      padding: 8,
      marginRight: 10,
    },

    username: {
      fontFamily: "Poppins_500Medium",
      fontSize: 12,
      textAlign: "center",
      flex: 1,
    },

    subtitle: {
      fontFamily: "Poppins_500Medium",
      fontSize: 18,
      
    },
    subtitle2: {
      fontFamily: "Poppins_500Medium",
      fontSize: 18,
      marginBottom: -8, 
    },

    textxp: {
      fontFamily: "Poppins_400Regular",
      fontSize: 14,
    },
    
    text: {
      fontFamily: "Poppins_400Regular",
      fontSize: 14,
      marginBottom: 4, 
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

    progressBar: {
      height: 10,
      marginTop: 8,
    },
    
    icon: {
      width: 60,
      height: 60,
    },
    
    viewBadge: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 20,
      marginHorizontal: 15,
      maxWidth: '70%',
    },
    
    badge: {
      borderRadius: 10,
      borderColor: "#6BBF59",
      borderWidth: 2,
      backgroundColor: "#F1F1F1",
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center', // Centraliza o conteúdo
    },


    botao: {
      backgroundColor: '#E2F2DF',
      borderRadius: 5,
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 2,

    },

    textBotao: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
      color: "#3F463E",
      paddingRight: 8,
    },

    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContainer: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },

    label: {
      fontSize: 16,
      marginBottom: 5,
      fontFamily: 'Poppins_500Medium',
    },
    labelModal: {
      fontSize: 10,
      color: '#333',
      fontFamily: 'Poppins_500Medium',
    },

    input: {
      borderColor: '#6BBF59',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
      height: 40,
    },

    iconGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 15,
    },

    iconCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderColor: '#ddd',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
    },

    selectedIcon: {
      backgroundColor: '#6BBF59',
    },

    iconText: {
      color: '#333',
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    confirmButton: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#6BBF59',
      flex: 1,
      marginHorizontal: 5,
    },

    cancelButton: {
    backgroundColor: '#6BBF59',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center'
    },

    buttonText: {
      color: '#6BBF59',
      fontFamily: 'Poppins_500Medium',
      
      textAlign: 'center',
    },

    buttonTextConfir: {
      color: '#fff',
      fontFamily: 'Poppins_500Medium',
    },

    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default Perfil;
