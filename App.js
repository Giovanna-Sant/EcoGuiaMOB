import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../EcoGuiaMOB/app/routes/AppNavigator'; 
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )

}