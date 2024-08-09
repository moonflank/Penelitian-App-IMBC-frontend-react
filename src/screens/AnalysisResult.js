import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const AnalysisResult = ({ route }) => {
  const { detections, pickedImage, imageWidth, imageHeight } = route.params;

  if (!detections || detections.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No detections available.</Text>
      </View>
    );
  }

  // Calculate aspect ratio of the image
  const aspectRatio = imageHeight / imageWidth;
  const screenHeight = screenWidth * aspectRatio;

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: pickedImage }} style={{ width: screenWidth, height: screenHeight }}>
        {detections.map((item, index) => {
          const color = getRandomColor();
          return (
            <View
              key={index}
              style={{
                ...styles.box,
                borderColor: color,
                left: (item.box[0] / imageWidth) * screenWidth,
                top: (item.box[1] / imageHeight) * screenHeight,
                width: ((item.box[2] - item.box[0]) / imageWidth) * screenWidth,
                height: ((item.box[3] - item.box[1]) / imageHeight) * screenHeight,
              }}
            >
              <Text style={{ ...styles.label, backgroundColor: color }}>
                {item.label} ({item.confidence.toFixed(2)})
              </Text>
            </View>
          );
        })}
      </ImageBackground>
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
  message: {
    fontSize: 18,
    color: '#888',
  },
  box: {
    position: 'absolute',
    borderWidth: 2,
  },
  label: {
    color: '#FFF',
    padding: 2,
    fontSize: 12,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default AnalysisResult;
