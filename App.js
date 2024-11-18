import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../EcoGuiaMOB/app/routes/AppNavigator'; 
import { ModalProvider } from './app/pages/login/ModalContext'
import CustomModal from './app/pages/login/CustomModal';

export default function App() {
  return (
    <NavigationContainer>
      <ModalProvider>
        <CustomModal/>
        <AppNavigator /> 
      </ModalProvider>
    </NavigationContainer>
  )

}