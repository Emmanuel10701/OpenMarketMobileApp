import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const ProductCard = ({ product, onPress }) => {
  return (
    <Animated.View entering={FadeInUp.duration(600).delay(100)} style={styles.productCard}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <AntDesign name="pluscircleo" size={20} color="#6a0dad" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    flex: 1,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#6a0dad',
    marginLeft: 10,
  },
  addToCartButton: {
    marginLeft: 10,
  },
});

export default ProductCard;