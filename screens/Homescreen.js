import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'; // Added Ionicons for menu button
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

// Ensure the path is correct for your project structure
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SELLERS } from '../utils/data';

// ProductCard component
const ProductCard = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productCard} onPress={onPress}>
    <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={1}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
    </View>
  </TouchableOpacity>
);

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigateTo, products = MOCK_PRODUCTS }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all'); // State for active category
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  const [filteredProducts, setFilteredProducts] = useState(products); // Use products prop

  // Effect to update filtered products whenever search query, category, or price changes
  useEffect(() => {
    let currentProducts = [...products]; // Start with all products

    // Apply category filter
    if (activeCategory !== 'all') {
      currentProducts = currentProducts.filter(product => product.category === activeCategory);
    }

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentProducts = currentProducts.filter(product => {
        const sellerName = MOCK_SELLERS[product.sellerId]?.name.toLowerCase() || '';
        return (
          product.title.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          sellerName.includes(lowerCaseQuery)
        );
      });
    }

    // Apply price filter
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min)) {
      currentProducts = currentProducts.filter(product => product.price >= min);
    }
    if (!isNaN(max)) {
      currentProducts = currentProducts.filter(product => product.price <= max);
    }

    setFilteredProducts(currentProducts);

  }, [searchQuery, activeCategory, minPrice, maxPrice, products]); // Depend on products prop as well

  // Handler for category button press
  const handleCategoryPress = (category) => {
    setActiveCategory(category);
    // Clear price filters when category is changed (optional, but good UX)
    // setMinPrice('');
    // setMaxPrice('');
  };

  // Handler to clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setFilteredProducts(products); // Reset to all products
  };

  const renderProduct = ({ item }) => (
    <ProductCard product={item} onPress={() => navigateTo('productDetail', { product: item })} />
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryItem, activeCategory === item.value && styles.activeCategoryItem]}
      onPress={() => handleCategoryPress(item.value)}
    >
      <Text style={[styles.categoryText, activeCategory === item.value && styles.activeCategoryText]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Sidebar Toggle Button */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <View style={styles.headerTop}>
          {/* Sidebar Toggle Button */}
          <TouchableOpacity onPress={() => navigateTo('sidebar')} style={styles.menuButton}>
            <Feather name="menu" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.logo}>ShopX</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={26} color="#333" /> 
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <AntDesign name="search1" size={18} color="#777" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        {/* Categories Section */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            {/* Removed the "See All" button for now, can add back if needed */}
          </View>
          <FlatList
            data={[{ id: 'all', name: 'All', value: 'all' }, ...MOCK_CATEGORIES]} // Added 'All' category
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </Animated.View>

        {/* Filters Section */}
        <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Filters</Text>
          <View style={styles.priceFilterContainer}>
            <TextInput
              style={[styles.priceInput, styles.minPriceInput]}
              placeholder="Min Price"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <Text style={styles.priceSeparator}>-</Text>
            <TextInput
              style={[styles.priceInput, styles.maxPriceInput]}
              placeholder="Max Price"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
          </View>
          <TouchableOpacity onPress={clearFilters} style={styles.clearFilterButton}>
            <Text style={styles.clearFilterButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Products Section */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)}>
          <Text style={styles.sectionTitle}>
            {searchQuery || activeCategory !== 'all' || minPrice || maxPrice ? 'Filtered Products' : 'Featured Products'}
          </Text>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false} // ScrollView handles scrolling
            columnWrapperStyle={styles.productGrid}
            contentContainerStyle={styles.productListContent}
          />
          {filteredProducts.length === 0 && (
            <Text style={styles.noProductsText}>No products found matching your criteria.</Text>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 45, // Adjust for status bar on iOS
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10, // Ensure header is above scrollable content
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuButton: {
    padding: 8, // Increased padding for easier tapping
  },
  logo: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#6a0dad',
  },
  cartButton: {
    padding: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 48, // Consistent height
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins_400Regular',
    paddingVertical: Platform.OS === 'ios' ? 12 : 10, // Adjust vertical padding for different platforms
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50, // Add padding at the bottom for better scroll visibility
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginLeft: 10,
    marginBottom: 12,
    marginTop: 15,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10, // Align with categoryList padding
  },
  categoryList: {
    paddingHorizontal: 10,
    paddingBottom: 5, // Add slight padding below the list
  },
  categoryItem: {
    backgroundColor: '#e9ecef', // Lighter background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20, // Rounded corners
    marginRight: 8, // Slightly less margin
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    minHeight: 40, // Ensure a minimum height
    // Removed shadow for a cleaner look, matching the new design
  },
  activeCategoryItem: {
    backgroundColor: '#6a0dad', // Active color
  },
  categoryText: {
    fontFamily: 'Poppins_500Medium',
    color: '#333', // Default text color
    fontSize: 14,
  },
  activeCategoryText: {
    color: '#fff', // Active text color
    fontFamily: 'Poppins_600SemiBold', // Slightly bolder for active
  },
  filtersSection: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  priceFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 15,
  },
  priceInput: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333',
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    textAlign: 'center',
  },
  minPriceInput: {
    flex: 1, // Takes up available space
    marginRight: 5,
  },
  priceSeparator: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#777',
    marginHorizontal: 5,
  },
  maxPriceInput: {
    flex: 1, // Takes up available space
    marginLeft: 5,
  },
  clearFilterButton: {
    backgroundColor: '#f8d7da', // Light red, indicating removal/cancel
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clearFilterButtonText: {
    color: '#721c24', // Dark red text
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  productGrid: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productListContent: {
    paddingHorizontal: 5, // Adjust to account for productCard margins
  },
  // ProductCard styles (adjusted for the new look)
  productCard: {
    width: (width / 2) - 25, // Account for horizontal padding and margin
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
    alignItems: 'center', // Center content within the card
  },
  productImage: {
    width: '100%',
    height: 160, // Slightly taller image
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
    width: '100%', // Ensure info takes full width for alignment
  },
  productName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center', // Center product name
  },
  productPrice: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#6a0dad',
    textAlign: 'center', // Center product price
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#777',
  },
});

export default HomeScreen;