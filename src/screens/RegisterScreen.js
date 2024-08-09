import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (!role) {
        setError('Please select a role.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Password and confirm password do not match.');
        return;
      }
      const response = await axios.post('http://10.0.2.2:8000/auth/register/', {
        username,
        password,
        email,
        role,
      });
      if (response.status === 201) {
        navigation.navigate('Login');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Role:</Text>
        <View style={styles.radioOptions}>
          <TouchableOpacity
            onPress={() => setRole('Produsen')}
            style={[styles.radioOption, role === 'Produsen' && styles.radioOptionActive]}
          >
            <Text style={styles.radioOptionText}>Produsen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRole('Distributor')}
            style={[styles.radioOption, role === 'Distributor' && styles.radioOptionActive]}
          >
            <Text style={styles.radioOptionText}>Distributor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRole('Pengecer')}
            style={[styles.radioOption, role === 'Pengecer' && styles.radioOptionActive]}
          >
            <Text style={styles.radioOptionText}>Pengecer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRole('Konsumen Akhir')}
            style={[styles.radioOption, role === 'Konsumen Akhir' && styles.radioOptionActive]}
          >
            <Text style={styles.radioOptionText}>Konsumen Akhir</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  radioContainer: {
    marginBottom: 12,
  },
  radioLabel: {
    marginBottom: 4,
  },
  radioOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  radioOption: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    marginBottom: 8,
    width: '48%', // 48% width untuk membuat 2 radio button per baris
  },
  radioOptionText: {
    fontSize: 16,
  },
  radioOptionActive: {
    backgroundColor: '#66CCFF',
    borderColor: '#66CCFF',
  },
});

export default RegisterScreen;
