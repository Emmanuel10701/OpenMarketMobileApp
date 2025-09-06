import React, { useState, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  ActivityIndicator, 
  Platform,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';

// Import all screens
import SellerProfileScreen from './screens/sellerProfile';
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/Homescreen';
import ProductDetailScreen from './screens/[id]/ProductDetail';
import CategoriesScreen from './screens/categories';
import ChatScreen from './screens/chatScreen';
import MyProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/settingpage';
import CartPage from './compoenets/cartpage';

// Import Data
import { MOCK_PRODUCTS, MOCK_SELLERS, MOCK_USER, MOCK_MESSAGES, MOCK_CATEGORIES } from './utils/data';

const { width } = Dimensions.get('window');

// Sidebar Component
const Sidebar = ({ isVisible, onClose, navigateTo }) => {
  const [slideAnim] = useState(new Animated.Value(-width));

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const menuItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'categories', label: 'Categories', icon: 'grid' },
    { id: 'myProfile', label: 'My Profile', icon: 'person' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const handleMenuItemPress = (screen) => {
    navigateTo(screen);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        {/* The overlay has a zIndex of 1, so it appears above the main content but below the sidebar */}
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View 
        style={[
          styles.sidebarContainer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Menu</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.sidebarContent}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item.id)}
            >
              <Ionicons name={item.icon} size={22} color="#fff" style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutButton]}
            onPress={() => handleMenuItemPress('login')}
          >
            <Ionicons name="log-out" size={22} color="#FF3B30" style={styles.menuIcon} />
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mainImageUri, setMainImageUri] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const navigateTo = (screen, params = {}) => {
    if (screen === 'productDetail' && params.product) {
      setSelectedProduct(params.product);
      setMainImageUri(params.product.imageUrl);
    }
    if (screen === 'chat' && params.product) {
      const conversation = MOCK_MESSAGES.filter(
        (msg) => msg.productId === params.product.id && 
                  (msg.senderId === MOCK_USER.id || msg.receiverId === MOCK_USER.id)
      );
      setSelectedProduct(params.product);
      setChatMessages(conversation);
    }
    if (screen === 'sellerProfile' && params.seller) {
      setSelectedSeller(params.seller);
    }
    if (screen === 'home' && params.category) {
      setCategoryFilter(params.category);
    } else if (screen !== 'home' && screen !== 'productDetail' && screen !== 'chat' && screen !== 'sellerProfile') {
      setCategoryFilter(null);
    }
    if (screen === 'sidebar') {
      setIsSidebarOpen(true);
    } else {
      setCurrentScreen(screen);
      setIsSidebarOpen(false);
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen navigateTo={navigateTo} />;
      case 'signup':
        return <SignupScreen navigateTo={navigateTo} />;
      case 'home':
        const productsToShow = categoryFilter 
          ? MOCK_PRODUCTS.filter(p => p.category === categoryFilter)
          : MOCK_PRODUCTS;
        return <HomeScreen navigateTo={navigateTo} products={productsToShow} />;
      case 'categories':
        return <CategoriesScreen navigateTo={navigateTo} categories={MOCK_CATEGORIES} />;
      case 'productDetail':
        return <ProductDetailScreen navigateTo={navigateTo} product={selectedProduct} mainImageUri={mainImageUri} setMainImageUri={setMainImageUri} sellerInfo={MOCK_SELLERS[selectedProduct?.sellerId]} />;
      case 'chat':
        return <ChatScreen navigateTo={navigateTo} product={selectedProduct} messages={chatMessages} user={MOCK_USER} seller={MOCK_SELLERS[selectedProduct?.sellerId]} setMessages={setChatMessages} />;
      case 'sellerProfile':
        return <SellerProfileScreen navigateTo={navigateTo} seller={selectedSeller} />;
      case 'myProfile':
        return <MyProfileScreen navigateTo={navigateTo} user={MOCK_USER} />;
      case 'settings':
        return <SettingsScreen navigateTo={navigateTo} />;
      case 'cart':
        return <CartPage navigateTo={navigateTo} />;
      default:
        return <HomeScreen navigateTo={navigateTo} products={MOCK_PRODUCTS} />;
    }
  };

  if (!fontsLoaded) {
    return (
      <LinearGradient colors={['#6a0dad', '#1F1C2C']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#6a0dad', '#1F1C2C']}
        style={styles.backgroundGradient}
      />
      <View style={styles.mainContent}>
        {renderCurrentScreen()}
      </View>
      {currentScreen !== 'login' && currentScreen !== 'signup' && (
        <Sidebar isVisible={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navigateTo={navigateTo} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  mainContent: {
    flex: 1,
    zIndex: 0, // Main content is at the bottom
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Sidebar styles
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1, // The overlay is between the main content and the sidebar
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#1F1C2C',
    zIndex: 2, // The sidebar is on top of everything
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sidebarTitle: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
  },
  closeButton: {
    padding: 5,
  },
  sidebarContent: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuIcon: {
    marginRight: 15,
    width: 24,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  logoutButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF3B30',
  },
});