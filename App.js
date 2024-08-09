// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FruitVisionScreen from './src/screens/FruitVisionScreen';
import ScanScreen from './src/screens/ScanScreen';
import AnalysisResult from './src/screens/AnalysisResult';
import TraceFruit from './src/screens/TraceFruit';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }}  />
        <Stack.Screen name="FruitVision" component={FruitVisionScreen} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="AnalysisResult" component={AnalysisResult} />
        <Stack.Screen name="TraceFruit" component={TraceFruit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
