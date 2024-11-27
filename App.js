import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text,  Modal, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ModalProvider } from './app/pages/login/ModalContext';
import CustomModal from './app/pages/login/CustomModal';
import LogoEcoGuia  from './app/assets/logo.svg';
import { TrilhaIcon, CatalogoIcon, HomeIcon, ColetaIcon, PerfilIcon, ConfigIcon } from "./app/assets";
import { Ionicons } from '@expo/vector-icons'; 


import Trilha from './app/pages/Trilha';
import Home from './app/pages/Home';
import Catalogo from './app/pages/catalogo/Catalogo';
import NoticiasPage from './app/pages/catalogo/NoticiasPage';
import DescartavelPage from './app/pages/catalogo/DescartavelPage';
import ReciclavelPage from './app/pages/catalogo/ReciclavelPage';
import Coleta from './app/pages/Coleta';
import Horarios from './app/pages/Horarios';
import Mapa from './app/pages/Mapa';
import Perfil from './app/pages/Perfil';
import Config from './app/pages/sidebar/Config';

import Login from './app/pages/login/Login';
import RedefinirSenha from './app/pages/login/RedefinirSenha';
import NovaSenha from './app/pages/login/NovaSenha';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HeaderLogo = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: '10' }}>
    <LogoEcoGuia width={120} height={50} />
  </View>
);

const HeaderMenuButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()}>
    <Ionicons name="menu" size={30} color="black" />
  </TouchableOpacity>
);



function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} options={{ headerShown: false }} />
      <Stack.Screen name="NovaSenha" component={NovaSenha} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

function TrilhaStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        title: "",
        headerRight: () => <HeaderMenuButton navigation={navigation} />,
        headerTitle: () => <HeaderLogo />,
      })}
    >
      <Stack.Screen name="Trilha" component={Trilha} />
    </Stack.Navigator>
  );
}



function CatalogoStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        title: "", 
        headerRight: () => route.name === "Catalogo" ? <HeaderMenuButton navigation={navigation} /> : null,
        headerTitle: () => <LogoEcoGuia width={120} height={50} paddingVertical={35} />,
        headerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="Catalogo" component={Catalogo} />
      <Stack.Screen name="NoticiasPage" component={NoticiasPage} />
      <Stack.Screen name="DescartavelPage" component={DescartavelPage} />
      <Stack.Screen name="ReciclavelPage" component={ReciclavelPage} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        title: "",
        headerRight: () => <HeaderMenuButton navigation={navigation} />,
        headerTitle: () => <HeaderLogo />,
      })}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function ColetaStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        title: "", 
        headerRight: () => route.name === "Coleta" ? <HeaderMenuButton navigation={navigation} /> : null,
        headerTitle: () => <LogoEcoGuia width={120} height={50} paddingVertical={35} />,
        headerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="Coleta" component={Coleta} />
      <Stack.Screen name="Horarios" component={Horarios} />
      <Stack.Screen name="Mapa" component={Mapa} />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
}

function PerfilStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        title: "",
        headerRight: () => <HeaderMenuButton navigation={navigation} />,
        headerTitle: () => <HeaderLogo />,
      })}
    >
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"  
      screenOptions={{
        tabBarStyle: {
          height: 80,  
          paddingBottom: 6,
          elevation: 50  
        },
        tabBarLabel: () => null,  
      }}
    >
      <Tab.Screen
        name="Trilha"
        component={TrilhaStack}
        options={{
          title: "",  
          headerShown: false,
          tabBarIcon: () => <TrilhaIcon />,  
        }}
      />
      <Tab.Screen
        name="Catalogo"
        component={CatalogoStack}
        options={{
          title: "",  
          headerShown: false,
          tabBarIcon: () => <CatalogoIcon />,  
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: "",  
          headerShown: false,
          tabBarIcon: () => <HomeIcon />,  
        }}
      />
      <Tab.Screen
        name="Coleta"
        component={ColetaStack}
        options={{
          title: "",  
          headerShown: false,
          tabBarIcon: () => <ColetaIcon />,  
        }}  
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{
          title: "",  
          headerShown: false,
          tabBarIcon: () => <PerfilIcon />,  
        }}
      />
    </Tab.Navigator>
  );
}

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
    <Ionicons name="arrow-back" size={24} color="black" />
  </TouchableOpacity>
);

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerPosition: "right", // Drawer abre pela direita
        headerShown: false,      // Header desativado por padrão
        drawerLabelStyle: {
          fontFamily: 'Poppins',
          fontSize: 16,
          color: "#3F463E",
          fontWeight: '600',
        },
      }}
    >
      {/* Tela Home */}
      <Drawer.Screen
        name="Casa"
        component={TabsNavigator}
        options={{
          drawerIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />

      {/* Tela de Configurações */}
      <Drawer.Screen
        name="Configurações"
        component={Config}
        options={({ navigation }) => ({
          drawerIcon: ({ color, size }) => <ConfigIcon color={color} size={size} />,
          headerShown: true, // Ativa o header para esta tela
          headerTitle: () => <LogoEcoGuia width={120} height={50} paddingVertical={45} />,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center", // Centraliza o título
          headerStyle: {
            // Adicione customizações do estilo do header, se necessário
          },
        })}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o tokenID está armazenado no cache
    const checkAuth = async () => {
      const tokenID = await cache.get("tokenID");
      if (tokenID) {
        setIsAuthenticated(true); // Se o token existir, o usuário está autenticado
      } else {
        setIsAuthenticated(false); // Caso contrário, o usuário não está autenticado
      }
    };

    checkAuth();
  }, []);

  return (
    <ModalProvider>
      <CustomModal />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Se não autenticado, mostra a tela de LoginStack */}
          {!isAuthenticated ? (
            <Stack.Screen name="LoginStack" component={LoginStack} />
          ) : (
            // Após login, mostra a navegação principal
            <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ModalProvider>
  );
}
