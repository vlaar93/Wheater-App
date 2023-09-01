import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';


export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');

    return () => {
      StatusBar.setBarStyle('light-content'); // Rétablir la couleur de la barre de statut d'origine
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome To Weather App</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WeatherScreen')}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#17bce6',
    borderRadius: 10,
    padding: 10,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
