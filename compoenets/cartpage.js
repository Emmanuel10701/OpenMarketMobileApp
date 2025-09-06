import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartPage = ({ navigateTo }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateTo('home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.emptyText}>Your cart is currently empty.</Text>
      {/* You can add your cart items list, total, and checkout button here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#777',
    textAlign: 'center',
  },
});

export default CartPage;