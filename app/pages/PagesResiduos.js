// Importações necessárias
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Tela principal
export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        São materiais que podem ser descartados corretamente no lixo reciclável e destinados à reciclagem.
      </Text>

      <Collapsible title="Metais">
        <ItemList items={['Ferragens', 'Fios De Cobre', 'Latas De Aerosol', 'Panelas Sem Cabo', 'Latas De Cerveja']} />
      </Collapsible>

      <Collapsible title="Papéis">
        <ItemList items={['Jornais', 'Revistas', 'Caixas de Papelão', 'Folhas Sulfite']} />
      </Collapsible>

      <Collapsible title="Vidros">
        <ItemList items={['Garrafas de Vidro', 'Potes de Vidro', 'Copos de Vidro']} />
      </Collapsible>

      <Collapsible title="Plásticos">
        <ItemList items={['Garrafas PET', 'Embalagens Plásticas', 'Sacolas Plásticas', 'Potes de Plástico']} />
      </Collapsible>
    </View>
  );
}

// Componente Collapsible
function Collapsible({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((prev) => !prev)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? '#000' : '#fff'} // Mudança de cor baseada no tema
        />
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

// Componente ItemList
function ItemList({ items }) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Ionicons name="ellipse" size={8} color="#007AFF" />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F0F0',
  },
  headerText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    marginTop: 8,
    marginLeft: 24,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

