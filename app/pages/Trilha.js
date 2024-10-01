import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import Footer from '../components/Footer';

const Trilha = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const windowHeight = Dimensions.get('window').height;

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
    <View style={styles.container}>


      {/* Conteúdo Principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.text}>Trilha Page Content</Text>
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
    backgroundColor: "#ffffff",
    paddingBottom: 95,
  },
  
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 18,
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
    flex: 1,  // Preenche toda a área disponível
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
});

export default Trilha;
