import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator, Animated, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { PointLocal } from '../assets'

const Mapa = () => {
    const [regiao, setRegiao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ecopontos, setEcopontos] = useState([]);
    const [nameEco, setNameEco] = useState('');
    const [enderecoEco, setEnderecoEco] = useState('');

    const info = (nome,endereco) => {
      setNameEco(nome)
      setEnderecoEco(endereco)
    }
  
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
                latitudeDelta: 0.200,
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

    
  // Carregamento das fontes
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
          <View style={styles.titleLocal}>
            <PointLocal style={{marginRight: 10}}/>
            <Text style={styles.subtitle}>{nameEco ? nameEco : "Selecione um ecoponto"}</Text>
          </View>
            <Text style={styles.text}>{enderecoEco  ? enderecoEco : ""}</Text>
        </View>

        {/* Mapa */}
        {regiao && (
          <MapView
            style={{ width: "100%", height: "100%" }}
            region={regiao}
            showsUserLocation={true}
            loadingEnabled={true}
            onMapLoaded={() =>
              <ActivityIndicator style={styles.loader} size="large" color="#000"/>  
            }
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
                onPress={() => info(ecoponto.properties.Name, ecoponto.properties.Endere__o)}
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

    mapaFrame: {
        width: "100%",
        height: "100%",
      },
      
      footerMapa: {
        zIndex: 5,
        position: 'absolute',
        backgroundColor: '#fff',
        padding: 15,
        margin: 15,
        minWidth: 320,
        borderRadius: 10,
        elevation: 6,
        bottom: 55
      },
      
      titleLocal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10
      },
      
      subtitle: {
        fontFamily: 'Poppins_500Medium',
      },
  
      text: {
        fontFamily: 'Poppins_400Regular',
      },
    })
  
export default Mapa