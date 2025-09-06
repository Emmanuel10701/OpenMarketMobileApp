import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.authContainer}>
      <LinearGradient
        colors={['#6a0dad', '#1F1C2C']}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.View entering={FadeInUp} style={styles.authCard}>
        <Text style={styles.authTitle}>Login</Text>
        <View style={styles.inputIconContainer}>
          <MaterialIcons name="email" size={24} color="#6a0dad" style={styles.inputIcon} />
          <TextInput
            style={styles.authInput}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputIconContainer}>
          <MaterialIcons name="lock" size={24} color="#6a0dad" style={styles.inputIcon} />
          <TextInput
            style={styles.authInput}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.authButton} onPress={() => navigateTo('home')}>
          <Text style={styles.authButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('signup')}>
          <Text style={styles.authLinkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  authCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  authTitle: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#1F1C2C',
    marginBottom: 20,
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputIcon: {
    paddingLeft: 15,
  },
  authInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  authButton: {
    width: '100%',
    backgroundColor: '#6a0dad',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  authLinkText: {
    color: '#6a0dad',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginTop: 10,
  },
});

export default LoginScreen;