import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import { TitleWatch } from '../assets';

const { width, height } = Dimensions.get('window');

const Horarios = () => {
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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.logoContainer}>
          <TitleWatch />
          <Text style={styles.description}>
            Confira os horários da coleta na tabela abaixo. O caminhão da coleta estará disponível conforme indicado!
          </Text>
        </View>

        {/* Tabela de horarios  */}
        <View>

        </View>

        <View style={styles.newsContainer}>
          <Text style={styles.subtitle}>Qual é a diferença entre coleta seletiva e comum?</Text>
          <View style={styles.containerInfo}>
            <Text style={styles.info}>
              Coleta Seletiva: A coleta seletiva separa materiais recicláveis para serem reaproveitados.
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.info}>
              Coleta Comum: A coleta comum leva os resíduos não recicláveis para descarte adequado.
            </Text>
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 75,
  },
  logoContainer: {
    alignItems: "center",
  },
  description: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.04,
    lineHeight: width * 0.05,
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  newsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.03,
    borderRadius: 5,
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
    backgroundColor: "#E2F2DF",
    elevation: 2,
    borderColor: '#A6D89B',
    borderWidth: 0.5,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.045,
    textAlign: 'center',
    padding: width * 0.009,
  },
  containerInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.04,
    borderRadius: 5,
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    backgroundColor: "#6BBF59",
    minHeight: 80, 
  },
  info: {
    fontFamily: "Poppins_600SemiBold",
    color: 'white',
    fontSize: width * 0.035,
    marginVertical: height * 0.001,
  }
});

export default Horarios;
