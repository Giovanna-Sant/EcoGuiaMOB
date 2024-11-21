import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Trilha from '../pages/Trilha';
import Catalogo from '../pages/catalogo/Catalogo';
import Coleta from '../pages/Coleta';
import Perfil from '../pages/Perfil';
import DescartavelPage from '../pages/catalogo/DescartavelPage';
import ReciclavelPage from '../pages/catalogo/ReciclavelPage';
import Login from '../pages/login/Login';
import NoticiasPage from '../pages/catalogo/NoticiasPage';
import Config from '../pages/sidebar/Config';
import RedefinirSenha from '../pages/login/RedefinirSenha';
import NovaSenha from '../pages/login/NovaSenha';
import Mapa from '../pages/Mapa';
import Header from '../components/Header';
import Horarios from '../pages/Horarios';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true, // Mostrando o cabeçalho
        gestureEnabled: false, // Permite gestos de voltar
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              opacity: current.progress, // Transição de dissolver
            },
          };
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} // Sem cabeçalho para a tela de Login
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ header: () => <Header showBackButton={false} /> }}
      />
      <Stack.Screen 
        name="Trilha" 
        component={Trilha} 
        options={{ header: () => <Header showBackButton={false} /> }} 
      />
      <Stack.Screen 
        name="Catalogo" 
        component={Catalogo} 
        options={{ header: () => <Header showBackButton={false} /> }} 
      />
      <Stack.Screen 
        name="Coleta" 
        component={Coleta} 
        options={{ header: () => <Header showBackButton={false} /> }} 
      />
      <Stack.Screen 
        name="Perfil" 
        component={Perfil} 
        options={{ headerShown: false }}/>
        
      <Stack.Screen 
        name="RedefinirSenha" 
        component={RedefinirSenha} 
        options={{ headerShown: false }}/>

      <Stack.Screen 
        name="NovaSenha" 
        component={NovaSenha} 
        options={{ headerShown: false }}/>

      <Stack.Screen 
        name="DescartavelPage" 
        component={DescartavelPage} 
        options={{ header: () => <Header showBackButton={true} /> }}
      />
      <Stack.Screen 
        name="ReciclavelPage" 
        component={ReciclavelPage} 
        options={{ header: () => <Header showBackButton={true} /> }}
      />
      <Stack.Screen 
        name="NoticiasPage" 
        component={NoticiasPage} 
        options={{ header: () => <Header showBackButton={true} /> }}
      />
      <Stack.Screen 
        name="Config" 
        component={Config} 
        options={{ header: () => <Header showBackButton={true} /> }}
      />
      <Stack.Screen 
        name="Mapa" 
        component={Mapa} 
        options={{ header: () => <Header showBackButton={true} /> }} 
      />
      <Stack.Screen 
        name="Horarios" 
        component={Horarios} 
        options={{ header: () => <Header showBackButton={true} /> }} 
      />
    </Stack.Navigator>
  );
}
