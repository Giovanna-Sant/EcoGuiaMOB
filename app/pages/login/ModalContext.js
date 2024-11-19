import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

// provedor do context
export const ModalProvider = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  // funcções para abrir e fechar modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <ModalContext.Provider value={{ isModalVisible, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// hook para usar o contexto da modal
export const useModal = () => useContext(ModalContext);
