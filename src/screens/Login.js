// src/LoginScreen.js
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import api from '../services/axios';
import {saveTokens} from '../Auth/auth';

export default function LoginScreen({onLoggedIn}) {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');

  async function handleLogin() {
    try {
      const {data} = await api.post('/login', {email, password});
      // here with { data } we are destructuring the data, like directly accessing the data
      // if we would have use simple res, than we have to do res.data.token
      const tokenObj = {
        token: data.token,
        refresh: 'dummy-refresh', // reqres doesn’t give one; fake it
        expiresAt: Date.now() + 15 * 60 * 1000,
      };
      await saveTokens(tokenObj);
      onLoggedIn();
    } catch (e) {
      Alert.alert('Login failed');
    }
  }

  return (
    <View style={{padding: 16}}>
      <TextInput placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
