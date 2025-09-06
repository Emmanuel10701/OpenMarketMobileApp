import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeIn, FadeOut } from 'react-native-reanimated';
import { MOCK_PRODUCTS } from '../utils/data';

const { width } = Dimensions.get('window');

const SellerProfileScreen = ({ navigateTo, seller }) => {
  const sellerProducts = MOCK_PRODUCTS.filter(p => p.sellerId === seller?.id);

  if (!seller) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Seller details not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigateTo('home')}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Define the seller details to display, including the new ones
  const sellerDetails = [
    { label: 'Location', value: seller.location, icon: 'location-outline' },
    { label: 'Joined', value: seller.joinDate, icon: 'calendar-outline' },
    { label: 'Response Rate', value: seller.responseRate, icon: 'chatbox-outline' },
    { label: 'Response Time', value: seller.responseTime, icon: 'time-outline' },
    { label: 'Total Listings', value: seller.listings, icon: 'list-outline' },
    { label: 'Avg. Shipping', value: seller.avgShippingTime, icon: 'cube-outline' },
  ];

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('chat', { product: sellerProducts[0] })} style={styles.backIcon}>
          <Feather name="chevron-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Profile</Text>
        <TouchableOpacity style={styles.moreIcon}>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.profileCard}>
          <Image source={{ uri: seller.profilePic }} style={styles.profileImage} />
          <Text style={styles.profileName}>{seller.name}</Text>
          <Text style={styles.profileBio}>{seller.bio}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{seller.listings}</Text>
              <Text style={styles.statLabel}>Listings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{seller.rating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{seller.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </Animated.View>

        {/* New "Seller Details" Section */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Seller Details</Text>
          {sellerDetails.map((detail, index) => (
            <View key={index} style={styles.detailRow}>
              <Ionicons name={detail.icon} size={20} color="#6a0dad" />
              <Text style={styles.detailLabel}>{detail.label}:</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Products by {seller.name}</Text>
          <FlatList
            data={sellerProducts}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.productCard} 
                onPress={() => navigateTo('productDetail', { product: item })}
              >
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <Text style={styles.productName} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
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
  moreIcon: { padding: 5 },
  contentContainer: { paddingHorizontal: 15, paddingTop: 20, paddingBottom: 20 },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  profileName: { fontSize: 24, fontFamily: 'Poppins_700Bold', color: '#333', marginBottom: 5 },
  profileBio: { fontSize: 16, fontFamily: 'Poppins_400Regular', color: '#777', textAlign: 'center' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 20, fontFamily: 'Poppins_600SemiBold', color: '#6a0dad' },
  statLabel: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: '#777' },
  section: {
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
  sectionTitle: { fontSize: 18, fontFamily: 'Poppins_600SemiBold', color: '#333', marginBottom: 10 },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginLeft: 10,
    width: 130, // Fixed width for consistent alignment
  },
  detailValue: {
    flex: 1, // Takes up the remaining space
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  productsList: { paddingHorizontal: 5 },
  productCard: {
    width: width * 0.4,
    marginRight: 15,
    alignItems: 'center',
  },
  productImage: { width: '100%', height: width * 0.4, borderRadius: 15, marginBottom: 10 },
  productName: { fontSize: 14, fontFamily: 'Poppins_500Medium', color: '#333', textAlign: 'center' },
  productPrice: { fontSize: 16, fontFamily: 'Poppins_600SemiBold', color: '#6a0dad', textAlign: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  errorText: { fontSize: 18, color: 'red', marginBottom: 20, fontFamily: 'Poppins_500Medium' },
  backButton: { backgroundColor: '#6a0dad', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25 },
  backButtonText: { color: '#fff', fontFamily: 'Poppins_500Medium' },
});

export default SellerProfileScreen;