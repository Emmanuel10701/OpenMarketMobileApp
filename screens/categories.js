import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { MOCK_CATEGORIES } from '../utils/data';

const { width } = Dimensions.get('window');

const CategoriesScreen = ({ navigateTo }) => {
  return (
    <View style={styles.fullScreenContainer}>
      <Animated.View entering={FadeIn.duration(500)} style={styles.mainHeader}>
        <TouchableOpacity onPress={() => navigateTo('home')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.mainHeaderText}>Categories</Text>
      </Animated.View>
      <FlatList
        data={MOCK_CATEGORIES}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryCard} 
            onPress={() => navigateTo('home', { category: item.value })}
          >
            <MaterialIcons name={item.icon} size={40} color="#6a0dad" />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  mainHeaderText: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  categoryList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 8,
    height: width * 0.4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333',
    marginTop: 10,
  },
});

export default CategoriesScreen;