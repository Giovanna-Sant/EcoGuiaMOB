import React, { createContext, useState, useContext, useCallback } from 'react';

const ModalContext = createContext();

// provedor do Context
export const ModalProvider = ({ children }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const [resolveModal, setResolveModal]   = useState(null);

	// funções para abrir e fechar modal
	const openModal = useCallback(() => {
		setModalVisible(true);
		return new Promise((resolve) => {
			setResolveModal(() => resolve);
		});
	}, []);
	const closeModal = useCallback((result) => {
		setModalVisible(false);
		if (resolveModal) {
			resolveModal(result);
			setResolveModal(null);
		}
	}, [resolveModal]);
	
	return (
		<ModalContext.Provider value={{ isModalVisible, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	);
};

// hook para usar o contexto da modal
export const useModal = () => useContext(ModalContext);