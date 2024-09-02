
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.text}>Login Page Content</Text>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default Login;

