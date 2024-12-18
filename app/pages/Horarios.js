import React,{useState} from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TextInput, Pressable } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TitleWatch } from '../assets';
import api from '../services/api'
const { width, height } = Dimensions.get('window');

const Horarios = () => {
  const [cep, setCep] = useState('');
  const [dados,setDados] = useState('');
  const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);

  const getTime = async () => {
    try{
      setLoading(true)
      setDisabled(true);
        console.log(cep)
        const response = await api.post('/pickupTime', { cep }, {
          timeout: 17000
        });
        setDados(response.data)
        
      }catch(error){
        alert(error.response.data.msg)
        console.error(error)
      }finally{
        setLoading(false)
        setDisabled(false);
      }
    }
    
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

      <View style={styles.cepContainer}>
          <Text style={styles.cepLabel}>CEP :</Text>
          <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            />
          </View>

          <Pressable
						style={styles.cepEnvio}
            onPress={getTime}
						disabled={disabled || loading}
					>
						{loading ? (
						<ActivityIndicator size="small" color="#fff" />
						) : (
              <Text style={styles.cepEnvioText}>OK</Text>
						)}
          </Pressable>
        </View> 

        {/* Fazer a Tabela de horarios  */}
        <View style={styles.tabelaContainer}>
                  {/* Cabeçalho da tabela */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Dia</Text>
            <Text style={styles.tableHeaderText}>Comum</Text>
            <Text style={styles.tableHeaderText}>Seletiva</Text>
          </View>

          {/* Linhas da tabela */}
          {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((dia, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{dia}</Text>
              <Text style={styles.tableCell}> 
              {dados && dados[dia] ? dados[dia].domiciliar : '-'}
              </Text>
              <Text style={styles.tableCell}> 
              {dados && dados[dia] ? dados[dia].seletiva : '-'}
              </Text>
            </View>
          ))}
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
    width: width * 0.9,
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
  },

  tabelaContainer: {
    borderColor: '#A6D89B',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: height * 0.02,
  },

  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },

  cepLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: width * 0.045,
    color: '#000',
    marginRight: 10,
  },

  cepEnvio: {
    backgroundColor: "#6BBF59",
		justifyContent: "center",
		borderRadius: 5,
		alignItems: "center",
		paddingHorizontal: 15,
		paddingVertical: 6,
    marginLeft: 5,
  },

  cepEnvioText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#fff'
  },

  inputView: {
		backgroundColor: "#F1F1F1",
		height: 40,
		paddingHorizontal: 10,
		borderRadius: 10,
		borderColor: "#3F463E",
		borderWidth: 0.5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
  },

  textInput: {
		width: 200,
    height: 50,
		fontFamily: "Poppins_400Regular",
    alignItems: 'center',
    fontSize: 16
	},

  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E2F2DF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderRadius: 5,
  },

  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    fontSize: width * 0.04,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    fontSize: width * 0.04,
  },


});

export default Horarios;