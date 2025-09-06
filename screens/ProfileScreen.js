import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const MyProfileScreen = ({ navigateTo, user }) => {
  return (
    <View style={styles.fullScreenContainer}>
      <LinearGradient
        colors={['#6a0dad', '#1F1C2C']}
        style={styles.profileBackgroundGradient}
      />
      <View style={styles.profileHeaderBar}>
        <TouchableOpacity onPress={() => navigateTo('home')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.profileHeaderTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.profileScrollViewContent}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.profileCard}>
          <Image source={{ uri: user.profilePic }} style={styles.profileImageLarge} />
          <Text style={styles.profileNameLarge}>{user.name}</Text>
          <Text style={styles.profileBioLarge}>{user.bio}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <MaterialIcons name="edit" size={18} color="#fff" />
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.profileActivitySection}>
          <Text style={styles.profileSectionTitle}>Your Activity</Text>
          <TouchableOpacity style={styles.profileOption}>
            <MaterialIcons name="shopping-bag" size={24} color="#6a0dad" />
            <Text style={styles.profileOptionText}>My Purchases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption}>
            <MaterialIcons name="favorite" size={24} color="#6a0dad" />
            <Text style={styles.profileOptionText}>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileOption}>
            <MaterialIcons name="message" size={24} color="#6a0dad" />
            <Text style={styles.profileOptionText}>Messages</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  profileBackgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  profileHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  profileHeaderTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
  },
  backButton: {
    padding: 5,
  },
  profileScrollViewContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  profileImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#6a0dad',
  },
  profileNameLarge: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
  },
  profileBioLarge: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6a0dad',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  editProfileButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 5,
  },
  profileActivitySection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileSectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  profileOptionText: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#555',
  },
});

export default MyProfileScreen;