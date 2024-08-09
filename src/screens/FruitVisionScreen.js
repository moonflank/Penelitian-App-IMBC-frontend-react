import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';

const FruitVisionScreen = ({ navigation }) => {
  const [fruits, setFruits] = useState(['Dragon Fruit', 'Papaya', 'Banana']);
  const windowWidth = useWindowDimensions().width;

  // Function to handle button press
  const handleFruitSelection = (fruit) => {
    // Navigate to the next screen and pass the selected fruit name as parameter
    navigation.navigate('ScanScreen', { selectedFruit: fruit });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your fruit</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {fruits.map((fruit, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: getButtonColor(index), width: windowWidth * 0.8 }]}
            onPress={() => handleFruitSelection(fruit)}>
            <Text style={styles.buttonText}>{fruit}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Function to get button color based on index
const getButtonColor = (index) => {
  const colors = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF', '#800080'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Putih
    fontWeight: 'bold',
  },
});

export default FruitVisionScreen;
