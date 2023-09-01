import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [cityName, setCityName] = useState('');

  const fetchWeatherData = async () => {
    if (!city) {
      Alert.alert('Champ vide', 'Veuillez entrer une ville valide.');
      return;
    }

    try {
      const apiKey = 'e3d4eac27c76ded92657bf42c68ccdd0';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod === '404') {
        Alert.alert('Ville inconnue', 'La ville que vous avez entrée n\'existe pas.');
        return;
      }

      data.main.temp = Math.round(data.main.temp);
      data.main.temp_min = Math.round(data.main.temp_min);
      data.main.temp_max = Math.round(data.main.temp_max);
      setWeatherData([...weatherData, data]);
      setCityName('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const clearWeatherData = () => {
    setWeatherData([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a city"
          placeholderTextColor="#999"
          onChangeText={(text) => setCity(text)}
          value={city}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearWeatherData}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {weatherData.map((data, index) => (
          <View key={index} style={styles.infoContainer}>
            <Text style={styles.ville}>{data.name}</Text>
            <Text style={styles.infoText}>
              Now: {data.main.temp}°C    {' '}
              <Text style={{ color: 'green' }}>Min: {data.main.temp_min}°C</Text>    {' '}
              <Text style={{ color: 'red' }}>Max: {data.main.temp_max}°C</Text>
            </Text>
            <Image
              source={{ uri: `http://openweathermap.org/img/w/${data.weather[0].icon}.png` }}
              style={styles.weatherIcon}
            />
            <Text style={styles.infoText}>Weather: {data.weather[0].description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 75,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 30,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    margin: 25, 
  },
  button: {
    flex: 1, 
    backgroundColor: '#17bce6',
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginLeft: 25,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  ville: {
    color: '#fff',
    marginBottom: 25,
    fontWeight:"bold",
    fontSize: 20,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: '#17bce6',
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 75,
    height: 75,
  },
});
