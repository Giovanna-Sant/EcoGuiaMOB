import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useModal } from './ModalContext'; // Importe o contexto
import { CheckToken } from '../../assets';

const CustomModal = () => {
  const { isModalVisible, closeModal } = useModal();

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
        <CheckToken width={45} height={45}/>
          <Text style={styles.modalText}>Token de Verificação</Text>
          <Text style={styles.modalInfo}>Insira o token que foi enviado para seu email para concluir a ação</Text>
          <View style={styles.inputView}>
						<TextInput
							placeholder="****"     
							style={styles.textInput}
						/>
            </View>
          <Pressable style={styles.botao} onPress={closeModal}>
            <Text style={styles.botaoTexto}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  modalText: {
		textAlign: 'center',
		fontFamily: "Poppins_600SemiBold",
		fontSize: 16,
  },

  botao: {
    backgroundColor: "#6BBF59",
		justifyContent: "center",
		borderRadius: 25,
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 5,
		marginTop: 20
  },

	botaoTexto: {
		fontFamily: "Poppins_600SemiBold",
		color: "#fff",
		fontSize: 14,
	},

  inputView: {
		backgroundColor: "#F1F1F1",
		height: 40,
		paddingHorizontal: 10,
		borderRadius: 15,
		marginVertical: 8,
		borderColor: "#3F463E",
		borderWidth: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	textInput: {
		width: 295,
    height: 50,
		fontFamily: "Poppins_400Regular",
    alignItems: 'center'
	},

  modalInfo: {
    width: 295,
    height: 50,
    fontFamily: "Poppins_400Regular",
    textAlign: 'center'
  }
});

export default CustomModal;
