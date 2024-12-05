import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Image,TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import { ArrowRight, Edit, Ranking } from '../assets';
import cache from '../utils/cache';
import getPerfil from '../utils/getProfile';
import { RefreshControl } from 'react-native-gesture-handler';
import api from '../services/api';
 
const Perfil = () => {
  const navigation = useNavigation();
 
  const [user, setUser] = useState({});
  useEffect(() => {
    setLoading(true)
    onRefresh()
    try {
      async function lerUser() {
        setUser(await cache.get("dados"));
        await getRank()
      }
      lerUser();
    } catch (erro) {
      console.log(erro);
    }finally{
      setLoading(false)
    }
  }, []);
 
  const [rank,setRank] = useState([])
  const getRank = async () => {
    try{
    const token = await cache.get('tokenID')
    const response  = await api.get('user/ranking',{
      headers: {
        authorization:`Bearer ${token}`
    }
  },)
    await getAllAvatar()
    setRank(response.data)
  }catch(error){
     // Se houver erro, verifica se é um erro de resposta
     if (error.response) {
      const status = error.response.status;
      const msg = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

      // Tratando erros com base no código de status
      switch (status) {
        case 422:
          console.error('Algo deu errado com os campos :(', msg);
          console.error(msg)
        break;

        case 404:
          console.error('Algo deu errado com o usuário :(');
          console.error(msg)
          break;

        case 400:
          console.error('Algo deu errado com a senha :(',   msg);
          console.error(msg)
        break;

        case 500:
          console.error('Algo deu errado com a conexão :(', msg);
          console.error(msg)
        break;

        default:
        console.error('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
        console.error('Erro ilegal:', response);
      }
    } else if (error.request) {
      // Se houver falha na requisição sem resposta do servidor
      console.error('Erro de conexão', 'Sem resposta do servidor. Verifique sua conexão');
    } else {
      // Outros tipos de erro (como erros de configuração)
      console.error('Erro', 'Erro desconhecido');
    }
  }
}
  const[loading,setLoading] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
 
  const [refresh, setRefresh] = useState(false)
 
  const onRefresh = async () => {
    setRefresh(true)
    await getPerfil()
    await getRank()
    setUser(await cache.get("dados"))
    setTimeout(() =>{
      setRefresh(false)  
    },2000)
  }
  const editPerfil = async () => {
    try {
      const token = await cache.get("tokenID");
      const response = await api.put('/user/profile', {
              name: nome,
              lastname: sobrenome,
              avatar: selectedIcon + 1
      },{
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      await getPerfil()
      await getRank()
      setUser(await cache.get("dados"));
    } catch (error) {
       // Se houver erro, verifica se é um erro de resposta
    if (error.response) {
      const status = error.response.status;
      const msg = error.response.data.msg || 'Erro desconhecido'; // mensagem de erro

      // Tratando erros com base no código de status
      switch (status) {
        case 422:
          console.error('Algo deu errado com os campos :(', msg);
          console.error(msg)
        break;

        case 404:
          console.error('Algo deu errado com o usuário :(');
          console.error(msg)
          break;

        case 400:
          console.error('Algo deu errado com a senha :(',   msg);
          console.error(msg)
        break;

        case 500:
          console.error('Algo deu errado com a conexão :(', msg);
          console.error(msg)
        break;

        default:
        console.error('Algo deu errado :(',  'Ocorreu um erro desconhecido. Tente novamente');
        console.error('Erro ilegal:', response);
      }
    } else if (error.request) {
      // Se houver falha na requisição sem resposta do servidor
      console.error('Erro de conexão', 'Sem resposta do servidor. Verifique sua conexão');
    } else {
      // Outros tipos de erro (como erros de configuração)
      console.error('Erro', 'Erro desconhecido');
    }
    }
  };
 
  const [avatar,setAvatar] = useState([])
 
  const getAllAvatar = async () =>{
    try {
      const response = await api.get('/avatars')
      setAvatar(response.data.avatares)
      setNome(user.name_user)
      setSobrenome(user.lastname_user)
 
    }
    catch(erro){
      console.log(erro)
    }
  }
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };
 
  const toggleModal = () => {
    getAllAvatar()
    setModalVisible(!isModalVisible);
  };
 
  const handleSave = () => {
    onRefresh();
    editPerfil();
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
 
    let levelProgress = 0;
  if (user) {
    levelProgress = user.XP_level > 0 ? user.XP_user / user.XP_level : 0;
  }
 
  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={
      <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
    }>
      <View style={styles.content}>
        <View style={styles.viewPerfil}>
          {/* Informações do Perfil */}
          <View style={styles.viewPerfilInfos}>
            <TouchableOpacity onPress={toggleModal}>
              <Edit maxHeight={24} maxWidth={24} />
            </TouchableOpacity>
 
            <Text style={styles.username}>{user.nickname_user}</Text>
          </View>
 
          {/* Detalhes do Perfil */}
          <View style={styles.profileDetails}>
            <View style={styles.iconDiv}>
              <Image
                style={styles.icon}
                width={60}
                height={60}
                source={{
                  uri: `${user.blob_avatar}`,
                }}
              />
            </View>
 
            <View style={styles.profileInfo}>
              <Text style={styles.subtitle}>{user.name_user} {user.lastname_user}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 200,
                }}
              >
                <Text style={styles.textxp}>XP {user.XP_user}/{user.XP_level}</Text>
                <Text style={styles.textLvl}>level {user.fk_level_user}</Text>
              </View>
              <Progress.Bar
                width={200}
                color="#6BBF59"
                unfilledColor="#EBEBEB"
                borderWidth={1}
                borderColor="#6BBF59"
                height={10}
                borderRadius={5}
                style={styles.progressBar}
                progress={levelProgress}
              />
            </View>
          </View>
        </View>
 
        {/* Botão da Trilha */}
        <View style={styles.viewBadge}>
          <View style={styles.badge}>
             {user && user.blob_badge?(
              <Image style={styles.badgeImg} source={{uri:`${user.blob_badge}`}} />
            ):(
              <Image style={styles.badgeImg} source={{uri: 'https://storage12ecoguia.blob.core.windows.net/blob-images-ecoguia/QUEST-01-DATA17324752145-NAMEBadge-00.png'}} />
            )}
          </View>
          <View style={styles.badgeInfo}>
            <Text style={styles.subtitle2}>{user.title_badge ? user.title_badge : "Sua badge inicial!"}</Text>
            <Text style={styles.text}>
              {user.description_badge ? user.description_badge : "Viu como é bom ter um appzinho como nós?  Explore mais."}
            </Text>
            <Pressable
              style={styles.botao}
              onPress={() => handlePress("Trilha")}
            >
              <Text style={styles.textBotao}>Ver Trilha de Objetivos</Text>
              <ArrowRight maxWidth={12} maxHeight={12} />
            </Pressable>
          </View>
        </View>
 
        <View style={styles.viewRanking}>
          <View style={styles.TitleRan}>
            <Ranking />
            <Text style={styles.subtitle2}>Ranking</Text>
            <View style={styles.botao2} />
          </View>
 
          <View style={styles.badgeInfo}>
            <Text style={styles.text}>
              Ganhe mais xp para avançar no ranking e ultrapasse seus adversários!
            </Text>
          </View>
 
          <View style={styles.RankingInfo}>
            <View style={styles.Rank}>
              <Text style={styles.position}>{rank[0] ? rank[0].next_positio : ""}</Text>
              {rank[0] ? (
                <Image
                  style={styles.icon}
                  width={60}
                  height={60}
                  source={{
                    uri: `${rank[0].next_avatar}`,
                  }}
                />
              ) : (
                <ActivityIndicator size="large" color="#fff" />
              )}
              <Text style={styles.username1}>{rank[0] ? rank[0].next_nickname : ""}</Text>
              <Text style={styles.userxp}>{rank[0] ? rank[0].next_xp : ""}</Text>
            </View>
 
            <View style={styles.ViewRank2}>
              <View style={styles.Rank2}>
                <Text style={styles.position}>{rank[0] ? rank[0].current_positio : ""}</Text>
                {rank[0] ? (
                  <Image
                    style={styles.icon}
                    width={60}
                    height={60}
                    source={{
                      uri: `${rank[0].current_avatar}`,
                    }}
                  />
                ) : (
                  <ActivityIndicator size="large" color="#fff" />
                )}
                <Text style={styles.username1}>{rank[0] ? rank[0].current_nickname : ""}</Text>
                <Text style={styles.userxp}>{rank[0] ? rank[0].current_xp : ""}</Text>
              </View>
            </View>
 
            <View style={styles.ViewRank2}>
              <View style={styles.Rank}>
                <Text style={styles.position}>{rank[0] ? rank[0].previous_positio : ""}</Text>
                {rank[0] ? (
                  <Image
                    style={styles.icon}
                    width={60}
                    height={60}
                    source={{
                      uri: `${rank[0].previous_avatar}`,
                    }}
                  />
                ) : (
                  <ActivityIndicator size="large" color="#fff" />
                )}
                <Text style={styles.username1}>{rank[0] ? rank[0].previous_nickname : ""}</Text>
                <Text style={styles.userxp}>{rank[0] ? rank[0].previous_xp : ""}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
 
      {/* Modal de Edição do Perfil */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.labelModal}>Nome:</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  //placeholder={user.name_user}
                />
 
                <Text style={styles.labelModal}>Sobrenome:</Text>
                <TextInput
                  style={styles.input}
                  value={sobrenome}
                  onChangeText={setSobrenome}
                />
 
                <View style={styles.iconGrid}>
                  {(avatar || []).map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.iconCircle,
                        selectedIcon === index && styles.selectedIcon,
                      ]}
                      onPress={() => handleIconSelect(index)}
                    >
                      <Image
                        style={styles.icon}
                        source={{
                          uri: `${avatar[index].blob_avatar}`,
                        }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
 
                <View style={styles.buttonContainer}>
                  <Pressable style={styles.cancelButton} onPress={toggleModal}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </Pressable>
                  <Pressable style={styles.confirmButton} onPress={handleSave}>
                    <Text style={styles.buttonTextConfir}>Confirmar</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
 
};
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingBottom: 25,
  },
 
  content: {
    flex: 1,
  },
 
  viewPerfil: {
    paddingBottom: 20,
    backgroundColor: "#F1F1F1",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    elevation: 5,
    alignItems: "center",
    maxWidth: "100%",
    paddingHorizontal: 20,
  },
 
  viewPerfilInfos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
 
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
 
  profileInfo: {
    justifyContent: "center",
    alignItems: "flex-start",
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
    backgroundColor: "#a6d89b",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "flex-start",
  },
 
  progressBar: {
    height: 10,
    marginTop: 8,
  },
 
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
 
  viewBadge: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginLeft: 38,
    justifyContent: 'center',
    paddingHorizontal: 35,
    marginBottom: 15,
    marginTop: 40,
    maxWidth: '80%'
  },
 
  badge: {
    borderRadius: 10,
    borderColor: "#6BBF59",
    borderWidth: 2,
    backgroundColor: "#F1F1F1",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
 
  botao: {
    backgroundColor: "#E2F2DF",
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
  },
 
  textBotao: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#3F463E",
    paddingRight: 8,
  },
 
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
 
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
 
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Poppins_500Medium",
  },
  labelModal: {
    fontSize: 10,
    color: "#333",
    fontFamily: "Poppins_500Medium",
  },
 
  input: {
    borderColor: "#6BBF59",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
 
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
 
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#ddd",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
 
  selectedIcon: {
    backgroundColor: "#6BBF59",
  },
 
  iconText: {
    color: "#333",
  },
 
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
 
  confirmButton: {
    backgroundColor: "#6BBF59",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#6BBF59",
    flex: 1,
    marginHorizontal: 5,
  },
 
  cancelButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#6BBF59",
    borderWidth: 2,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
 
  buttonText: {
    color: "#6BBF59",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
 
  buttonTextConfir: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
  },
 
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
  viewRanking: {
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
    marginHorizontal: 22,
    justifyContent: 'center',
  },
 
  TitleRan:{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,  
    alignItems: 'center',
    justifyContent: 'center'
  },
 
  botao2: {
    backgroundColor: "#E2F2DF",
    borderRadius: 2,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '20%'
  },
 
  Rank: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    backgroundColor: "#F1F1F1",
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(63, 70, 62, 0.5)',
    borderRadius: 5,
    width: "90%",
    elevation: 3,
  },
 
  Rank2: {
    position: 'absolute',
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E2F2DF",
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(63, 70, 62, 0.5)',
    borderRadius: 5,
    width: "95%",
    elevation: 8,  
  },
 
  position: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#6BBF59",
    width: 20,
    textAlign: "center",
  },
 
  RankingInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    gap: 25
  },
 
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 1,
  },
 
  username1: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#3F463E",
 
  },
 
  userxp: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#3F463E",
  },
 
  ViewRank2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
 
  badgeImg: {
    width: 80,
    height: 110
    }
});
 
export default Perfil;
