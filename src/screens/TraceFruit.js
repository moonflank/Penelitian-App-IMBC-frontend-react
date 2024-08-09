// screens/TraceFruit.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TraceFruit = () => {
  const [fruitID, setFruitID] = useState('');
  const [traceData, setTraceData] = useState(null);

  const handleTrace = () => {
    // Simulasi pengambilan data dari blockchain
    const data = {
      id: fruitID,
      origin: 'Farm A',
      status: 'In Transit',
      destination: 'Supermarket B',
    };
    setTraceData(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trace Fruit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Fruit ID"
        value={fruitID}
        onChangeText={setFruitID}
      />
      <Button title="Trace" onPress={handleTrace} />
      {traceData && (
        <View style={styles.result}>
          <Text>ID: {traceData.id}</Text>
          <Text>Origin: {traceData.origin}</Text>
          <Text>Status: {traceData.status}</Text>
          <Text>Destination: {traceData.destination}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
  },
});

export default TraceFruit;
