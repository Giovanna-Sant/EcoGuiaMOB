  import React from "react";
  import { Ionicons } from '@expo/vector-icons';  // Ou qualquer pacote de ícones que você esteja usando
  import { TouchableOpacity, View } from 'react-native';
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { createDrawerNavigator } from "@react-navigation/drawer";
  import { TrilhaIcon, CatalogoIcon, HomeIcon, ColetaIcon, PerfilIcon } from "./app/assets";
  import { ModalProvider } from './app/pages/login/ModalContext'
  import CustomModal from './app/pages/login/CustomModal';
  import LogoEcoGuia  from './app/assets/logo.svg'

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

  function TrilhaStack() {
    return (
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: true,
          title: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: '10' }}>
              <LogoEcoGuia width={120} height={50} /> 
            </View>
          ),
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
          headerRight: () =>
            route.name === "Catalogo" ? (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} color="black" />
              </TouchableOpacity>
            ) : null,
          headerTitle: () => (
            <LogoEcoGuia width={120} height={50} paddingVertical={35}   />  
          ),
          headerStyle: {
            alignItems: 'center', 
            justifyContent: 'center',
            
          },
          headerTitleAlign: 'center',
          
        })}
      >
        <Stack.Screen
          name="Catalogo"
          component={Catalogo}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="NoticiasPage" component={NoticiasPage} options={{ headerShown: false }} />
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
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: '10'  }}>
              <LogoEcoGuia width={120} height={50} /> 
            </View>
          ),
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
          headerRight: () =>
            route.name === "Coleta" ? (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} color="black" />
              </TouchableOpacity>
            ) : null,
          headerTitle: () => (
            <LogoEcoGuia width={120} height={50}  paddingVertical={35}/>  
          ),
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
      </Stack.Navigator>
    );
  }




  function PerfilStack() {
    return (
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: true,
          title: "",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons name="menu" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: '10' }}>
              <LogoEcoGuia width={120} height={50} /> 
            </View>
          ),
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


  function DrawerNavigator() {
    return (
      <Drawer.Navigator
        initialRouteName="Casa"
        screenOptions={{
          drawerPosition: "right", // Drawer abre pela direita
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Casa" component={TabsNavigator} />
        <Drawer.Screen name="Config" component={Config} />
      </Drawer.Navigator>
    );
  }

  export default function App() {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }