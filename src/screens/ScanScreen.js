import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../api/api';

const fruitImages = {
  'Dragon Fruit': require('../../assets/dragon_fruit.jpg'), // Adjust the path as needed
  'Papaya': require('../../assets/papaya.jpg'), // Adjust the path as needed
  'Banana': require('../../assets/banana.jpg'), // Adjust the path as needed
};

const ScanScreen = ({ route, navigation }) => {
  const { selectedFruit } = route.params;
  const [pickedImage, setPickedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedFruit && fruitImages[selectedFruit]) {
      setPickedImage(Image.resolveAssetSource(fruitImages[selectedFruit]).uri);
    }
  }, [selectedFruit]);

  const takeImageHandler = async (sourceType) => {
    let pickerResult;
    if (sourceType === 'camera') {
      pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    console.log('Picker result:', pickerResult);

    if (pickerResult && !pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      const uri = pickerResult.assets[0].uri;
      console.log('Image picked:', uri);
      setPickedImage(uri);
    } else {
      console.log('Image picking cancelled or failed.');
    }
  };

  const analyzeImageHandler = async () => {
    if (!pickedImage) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', {
      uri: pickedImage,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('selectedFruit', selectedFruit);

    try {
      console.log('Sending image to server...');
      const response = await api.post('api/analyze/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Server response:', response.data);
      setIsLoading(false);
      navigation.navigate('AnalysisResult', { 
        detections: response.data.detections || [], 
        pickedImage, 
        imageWidth: response.data.imageWidth, 
        imageHeight: response.data.imageHeight 
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      setIsLoading(false);
      Alert.alert('Error', 'Something went wrong while analyzing the image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan your fruit: {selectedFruit}</Text>
      <View style={styles.imageContainer}>
        {pickedImage && <Image source={{ uri: pickedImage }} style={styles.image} />}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => takeImageHandler('gallery')}>
          <Text style={styles.buttonText}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => takeImageHandler('camera')}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <TouchableOpacity onPress={analyzeImageHandler} style={styles.analyzeButton}>
          <Text style={styles.analyzeText}>Analyze</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: '80%',
    height: 200,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  analyzeText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ScanScreen;
