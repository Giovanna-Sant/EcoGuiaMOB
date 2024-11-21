import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TrilhaIcon, CatalogoIcon, HomeIcon, ColetaIcon, PerfilIcon } from "./app/assets";
import { ModalProvider } from './app/pages/login/ModalContext'
import CustomModal from './app/pages/login/CustomModal';

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

// import Login from '../pages/login/Login';
// import RedefinirSenha from '../pages/login/RedefinirSenha';
// import Token from '../pages/login/Token';
// import NovaSenha from '../pages/login/NovaSenha';








const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TrilhaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Trilha"
        component={Trilha}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function CatalogoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catalogo"
        component={Catalogo}
        options={{ headerShown: false }}
      />


      <Stack.Screen name="NoticiasPage" component={NoticiasPage} />
      <Stack.Screen name="DescartavelPage" component={DescartavelPage} />
      <Stack.Screen name="ReciclavelPage" component={ReciclavelPage} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ColetaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catalogo"
        component={Coleta}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Horarios" component={Horarios} />
      <Stack.Screen name="Mapa" component={Mapa} />

    </Stack.Navigator>
  );
}

function PerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Config" component={Config} />
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




export default function App() {
  return (
    <NavigationContainer>

      <ModalProvider>
        <CustomModal/>

      </ModalProvider>
      <Drawer.Navigator
        initialRouteName="Tabs" // screenOptions={{ headerShown: false }}  Esconder o header aqui
      >
        <Drawer.Screen name="Tabs" component={TabsNavigator} />
        <Drawer.Screen name="Config" component={Config} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}