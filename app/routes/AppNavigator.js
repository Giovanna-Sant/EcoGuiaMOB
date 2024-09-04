import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Trilha from '../pages/Trilha';
import Catalogo from '../pages/Catalogo';
import Coleta from '../pages/Coleta';
import Perfil from '../pages/Perfil';
import DescartavelPage from '../pages/DescartavelPage'
import ReciclavelPage from '../pages/ReciclavelPage'
import Login from '../pages/Login';

// Cria o Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarStyle: {
          display: 'none', // Esconde a tabBar padrão
        },
        headerShown: false, // Esconde o cabeçalho padrão
      }}
    >
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trilha" component={Trilha} />
      <Tab.Screen name="Catalogo" component={Catalogo} />
      <Tab.Screen name="Coleta" component={Coleta} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="DescartavelPage" component={DescartavelPage} />
      <Tab.Screen name="ReciclavelPage" component={ReciclavelPage} />
    </Tab.Navigator>
  );
}
