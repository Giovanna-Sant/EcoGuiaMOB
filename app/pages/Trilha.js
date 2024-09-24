import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Trilha = () => {
  const [modalVisible, setModalVisible] = useState(false);  // Estado para controlar a visibilidade do modal
  const windowHeight = Dimensions.get('window').height;     // Obter a altura da tela

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
      <Header />
      
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
        <View style={[styles.modalView, { height: windowHeight * 0.8 }]}>
          <Text style={styles.modalText}>Selecione os materiais</Text>
          <Text style={styles.modalDescri}>Selecione os materiais que fazem parte desta coleta</Text>
          
          {/* Adicione aqui os componentes de seleção de materiais */}
          <View style={styles.materialsContainer}>
           
          </View>

          {/* Botão de fechar o modal */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
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
    // marginBottom: 20,
    textAlign: 'center',
  },

  modalDescri:{
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    marginBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
  },

  materialsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Estilos para o botão de fechar o modal
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',  // Vermelho tomate
    borderRadius: 10,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default Trilha;
