import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator, Animated, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Local, ArrowLeft } from '../assets'

const Mapa = () => {
    const [regiao, setRegiao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ecopontos, setEcopontos] = useState([]);
  
    // Navegação de páginas
    const navigation = useNavigation();

    const handlePress = (screen) => {
      navigation.navigate(screen);
    };

    // Pedir localização
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                alert("Permissão de acesso à localização negada. Não será possível trazer informações")
                setLoading(false)
                return
            } else {
              handleCallNotification();
            }

            let location = await Location.getCurrentPositionAsync({})
            setRegiao({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
            });

            // Buscar dados dos ecopontos 
            try {
                let response = await fetch('https://api-ecopontos.onrender.com/ecopontos');  
                if (!response.ok) {
                  console.log('Network response was not ok', response.statusText);
                  return;
              }
                let data = await response.json();
                setEcopontos(data.features);
              } catch (error) {
                console.log('Erro ao buscar dados dos ecopontos:', error);
              }

              setLoading(false)
        })()
    }, [])

      async function handleCallNotification() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão Negada", "Você não receberá notificações.");
      return;
    }


  }
    
    // Carregamento de fontes
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
    });

    if (!fontsLoaded) {
      return (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      );
    }

    // Aplicação
    return (
      <View style={styles.container}>
        <View style={styles.footerMapa}>
          <Text>Oidsii</Text>
          <Text>Oiidsi</Text>
          <Text>Oiii</Text>
        </View>

        {/* Mapa */}
        {regiao && (
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={regiao}
            showsUserLocation={true}
          >
            {ecopontos.map((ecoponto, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: ecoponto.geometry.coordinates[1],
                  longitude: ecoponto.geometry.coordinates[0],
                }}
                title={ecoponto.properties.Name}
                description={ecoponto.properties.Endere__o}
              ></Marker>
            ))}
          </MapView>
        )}
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    footerMapa: {
      flex: 2,
      zIndex: 5,
      borderWidth: 2,
      paddingTop: 40
    }
  });
  
export default Mapa