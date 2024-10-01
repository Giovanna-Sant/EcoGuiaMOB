// Sidebar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Sidebar({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <View style={{ position: 'absolute', right: 0, width: 250, height: '100%', backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={onClose}>
        <Text>Close Menu</Text>
      </TouchableOpacity>
      <Text>Item 1</Text>
      <Text>Item 2</Text>
      {/* Outros itens do menu */}
    </View>
  );
}
