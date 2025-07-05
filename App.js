// App.js
import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/Login';
import {getTokens, clearTokens} from './src/Auth/auth';

export default function App() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    getTokens().then(t => setAuthed(!!t?.token));
  }, []);

  // clearTokens();
  return (
    <Provider store={store}>
      {authed ? (
        <HomeScreen />
      ) : (
        <LoginScreen onLoggedIn={() => setAuthed(true)} />
      )}
    </Provider>
  );
}
