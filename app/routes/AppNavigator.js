import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Trilha from '../pages/Trilha';
import Catalogo from '../pages/catalogo/Catalogo';
import Coleta from '../pages/Coleta';
import Perfil from '../pages/Perfil';
import DescartavelPage from '../pages/catalogo/DescartavelPage'
import ReciclavelPage from '../pages/catalogo/ReciclavelPage'
import Login from '../pages/login/Login';
import NoticiasPage from '../pages/catalogo/NoticiasPage';
import Config from '../pages/sidebar/Config';
import RedefinirSenha from '../pages/login/RedefinirSenha';
import Token from '../pages/login/Token';
import NovaSenha from '../pages/login/NovaSenha';

// Cria o Tab Navigator
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarStyle: {
          display: 'none', 
        },
        headerShown: false,
      }}
    >
      {/* oculta a seta */}
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trilha" component={Trilha} />
      <Tab.Screen name="Catalogo" component={Catalogo} />
      <Tab.Screen name="Coleta" component={Coleta} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="RedefinirSenha" component={RedefinirSenha} />
      <Tab.Screen name="Token" component={Token} />
      <Tab.Screen name="NovaSenha" component={NovaSenha} />
      {/* com seta para voltar  */}
      <Tab.Screen name="DescartavelPage" component={DescartavelPage} />
      <Tab.Screen name="ReciclavelPage" component={ReciclavelPage} />
      <Tab.Screen name="NoticiasPage" component={NoticiasPage} />
      <Tab.Screen name="Config" component={Config}/>
    </Tab.Navigator>
  );
}
