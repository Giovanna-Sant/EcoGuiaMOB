import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Dimensions, TouchableWithoutFeedback, Pressable } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TitleTrilha, PointNone, PointLocal } from '../assets';
import Footer from '../components/Footer';
import api from '../services/api';

const Trilha = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);

  const windowHeight = Dimensions.get('window').height;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  const arrayObjetivos = [
    { id: 1, descricao: "Recolha uma latinha de refrigerante e a deposite-a no lixo correto.", xp: 25, id_badge: 'null' },
    { id: 2, descricao: "Chute quatro crianças", xp: 50, id_badge: 'null' },
    { id: 3, descricao: "Chute dois adultos", xp: 25, id_badge: 1 },
    { id: 4, descricao: "Acaricie um gato", xp: 25, id_badge: 'null' },
    { id: 5, descricao: "Acaricie um cachorro", xp: 25, id_badge: 'null' },
    { id: 6, descricao: "Chute 56 idosas", xp: 50, id_badge: 2 },
  ];


  const concluirObjetivo = () => {
    setSelectedQuest(null)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TitleTrilha maxWidth={210} />
        <View style={styles.container}>
          {arrayObjetivos.map((quest) => (
            <View key={quest.id} style={styles.viewQuest}>
              <Pressable onPress={() => setSelectedQuest(quest)}>
                <PointNone width={60} />
              </Pressable>

              <Modal
                animationType="fade"
                transparent={true}
                visible={selectedQuest?.id === quest.id}
                onRequestClose={() => setSelectedQuest(null)}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.subtitle}>Missão {quest.id}</Text>
                  <Text style={styles.text}>{quest.descricao}</Text>
                  <TouchableOpacity
                    style={styles.botaoCheck}
                    onPress={concluirObjetivo}
                  >
                    <Text style={styles.textBotao}>Concluir</Text>
                    <Text style={styles.textBotao}>+{quest.xp} XP</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botão flutuante (a bolinha verde) */}
      <TouchableOpacity 
        style={styles.floatingButton} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {/* Modal que aparece ao pressionar o botão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalView, { height: windowHeight * 0.8 }]}>
          <Text style={styles.modalText}>Selecione os materiais</Text>
          <Text style={styles.modalDescri}>Selecione os materiais que fazem parte desta coleta</Text>
          
          {/* Componentes de seleção de materiais */}
          <View style={styles.materialsContainer}>
            {/* Linha 1 */}
            <View style={styles.row}>
              <View style={[styles.materialCircle, { backgroundColor: '#A6C8FF' }]}>
                <Text style={styles.materialXP}>10XP</Text>
                <Text style={styles.materialName}>Papel</Text>
              </View>
              <View style={[styles.materialCircle, { backgroundColor: '#FF9E9E' }]}>
                <Text style={styles.materialXP}>20XP</Text>
                <Text style={styles.materialName}>Plástico</Text>
              </View>
            </View>

            {/* Linha 2 */}
            <View style={styles.row}>
              <View style={[styles.materialCircle, { backgroundColor: '#A8E6A3' }]}>
                <Text style={styles.materialXP}>30XP</Text>
                <Text style={styles.materialName}>Vidro</Text>
              </View>
              <View style={[styles.materialCircle, { backgroundColor: '#EBD687' }]}>
                <Text style={styles.materialXP}>40XP</Text>
                <Text style={styles.materialName}>Metal</Text>
              </View>
            </View>

            {/* Linha 3 */}
            <View style={styles.row}>
              <View style={[styles.materialCircle, { backgroundColor: '#F0C4A4' }]}>
                <Text style={styles.materialXP}>50XP</Text>
                <Text style={styles.materialName}>Eletrônicos</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2F2DF",
    paddingBottom: 95,
  },
  
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

	text: {
		fontFamily: "Poppins_400Regular",
		fontSize: 16,
		color: "#000",
		textAlign: 'center'
	},

	textBotao: {
		fontFamily: "Poppins_600SemiBold",
		fontSize: 14,
		color: "#fff",
		textAlign: 'center',
    paddingHorizontal: 2
	},

  subtitle: {
		fontFamily: "Poppins_400Regular",
		fontSize: 14,
		color: "#3F463E",
		textAlign: 'center'
  },

  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#A6D89B',  
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,  
    right: 20,  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,  
  },

  buttonText: {
    fontSize: 30,
    color: '#000',
  },

  modalBackground: {
    flex: 1, 
  },

  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    textAlign: 'center',
  },

  modalDescri: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
  },

  materialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',

  },

  materialCircle: {
    width: 114,
    height: 114,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },

  materialXP: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#FFF',
    position: 'absolute',
    top: 10,
    textAlign: 'center',
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  materialName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },

  // estilização quests

  viewQuest: {
  },

  botaoCheck: {
    backgroundColor: "#6BBF59",
		justifyContent: "center",
		borderRadius: 25,
		alignItems: "center",
		paddingHorizontal: 5,
		paddingVertical: 5,
		marginTop: 10,
    flexDirection: 'row'
  },
  
  modalContent: {
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 10,
    padding: 15,
    margin: 80
  },
});

export default Trilha;
