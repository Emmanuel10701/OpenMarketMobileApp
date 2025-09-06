import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { AntDesign, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

// Correct the import path to match your data file structure
import { MOCK_PRODUCTS, MOCK_SELLERS } from '../../utils/data';

const { width } = Dimensions.get('window');

const ProductDetail = ({ navigateTo, product }) => {
  const currentProduct = product || MOCK_PRODUCTS.find(p => p.id === product?.id);
  const seller = currentProduct ? MOCK_SELLERS[currentProduct.sellerId] : null;

  if (!currentProduct || !seller) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product details not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigateTo('home')}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo('home')} style={styles.backIcon}>
            <Feather name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>Product Details</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="share-2" size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <AntDesign name="hearto" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Animated.View entering={FadeInUp.delay(200).duration(600)}>
            <FlatList
              data={currentProduct.gallery}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `${currentProduct.id}-img-${index}`}
              renderItem={({ item }) => (
                <Image source={{ uri: item }} style={styles.galleryImage} />
              )}
              style={styles.galleryContainer}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.infoBox}>
            <View style={styles.infoTop}>
              <Text style={styles.productName}>{currentProduct.title}</Text>
              <Text style={styles.productPrice}>${currentProduct.price.toFixed(2)}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star-rate" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{currentProduct.rating.toFixed(1)} Stars</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.productDescription}>{currentProduct.description}</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.userBox}>
            <Text style={styles.sectionTitle}>Posted by</Text>
            <View style={styles.userProfile}>
              <Image source={{ uri: seller.profilePic }} style={styles.profilePic} />
              <View>
                <Text style={styles.userName}>{seller.name}</Text>
                <Text style={styles.userBio}>{seller.bio}</Text>
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.footer}>
          <View style={styles.footerButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.chatButton]}
              onPress={() => navigateTo('chat', { product: currentProduct })}
            >
              <Ionicons name="chatbox-outline" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>Chat with {seller.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.addToCartButton]}>
              <AntDesign name="shoppingcart" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  backIcon: { padding: 5 },
  headerTitle: { fontSize: 20, fontFamily: 'Poppins_600SemiBold', color: '#333' },
  headerIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 15, padding: 5 },
  contentContainer: { 
    paddingHorizontal: 15,
    paddingVertical: 20,
    paddingBottom: 120,
  },
  galleryContainer: { 
    height: width - 30, 
    borderRadius: 25, 
    overflow: 'hidden',
    marginBottom: 20,
  },
  galleryImage: { 
    width: width - 30, 
    height: width - 30,
    resizeMode: 'cover',
  },
  infoBox: {
    backgroundColor: '#fff', 
    borderRadius: 25, 
    padding: 25, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productName: { 
    flex: 1,
    fontSize: 24, 
    fontFamily: 'Poppins_700Bold', 
    color: '#333',
    marginRight: 15,
  },
  productPrice: { 
    fontSize: 22, 
    fontFamily: 'Poppins_600SemiBold', 
    color: '#6a0dad', 
    textAlign: 'right',
  },
  ratingContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  ratingText: { 
    fontSize: 16, 
    fontFamily: 'Poppins_500Medium', 
    color: '#555', 
    marginLeft: 5 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontFamily: 'Poppins_600SemiBold', 
    color: '#333', 
    marginTop: 10, 
    marginBottom: 8,
  },
  productDescription: { 
    fontSize: 16, 
    fontFamily: 'Poppins_400Regular', 
    color: '#666', 
    lineHeight: 24,
  },
  userBox: {
    backgroundColor: '#fff', 
    borderRadius: 25, 
    padding: 25, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  userProfile: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10,
  },
  profilePic: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 15,
  },
  userName: { 
    fontSize: 18, 
    fontFamily: 'Poppins_600SemiBold', 
    color: '#333',
  },
  userBio: { 
    fontSize: 14, 
    fontFamily: 'Poppins_400Regular', 
    color: '#777',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    flex: 1,
  },
  chatButton: {
    backgroundColor: '#6c757d',
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: '#6a0dad',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_500Medium',
  },
});

export default ProductDetail;