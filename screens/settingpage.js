import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigateTo }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <View style={styles.fullScreenContainer}>
      <LinearGradient
        colors={['#6a0dad', '#1F1C2C']}
        style={styles.headerGradient}
      />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('home')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Account Settings</Text>
          <TouchableOpacity style={styles.settingsOption}>
            <MaterialIcons name="person" size={24} color="#6a0dad" />
            <Text style={styles.settingsOptionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsOption}>
            <MaterialIcons name="lock" size={24} color="#6a0dad" />
            <Text style={styles.settingsOptionText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>App Preferences</Text>
          <View style={styles.settingsOption}>
            <MaterialIcons name="notifications" size={24} color="#6a0dad" />
            <Text style={styles.settingsOptionText}>Push Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#6a0dad" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
              value={notificationsEnabled}
              style={styles.switch}
            />
          </View>
          <View style={styles.settingsOption}>
            <MaterialIcons name="dark-mode" size={24} color="#6a0dad" />
            <Text style={styles.settingsOptionText}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={darkModeEnabled ? "#6a0dad" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setDarkModeEnabled(previousState => !previousState)}
              value={darkModeEnabled}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Help & Support</Text>
          <TouchableOpacity style={styles.settingsOption}>
            <MaterialIcons name="help-outline" size={24} color="#6a0dad" />
            <Text style={styles.settingsOptionText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsOption}>
            <MaterialIcons name="email" size={24} color="#6a0dad" />
            <Text style={styles.settingsOptionText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsOption}>
            <MaterialIcons name="privacy-tip" size={24} color="#6a0dad" />
            <Text style={styles.settingsOptionText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Lighter background for contrast
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsOptionText: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#555',
    flex: 1,
  },
  switch: {
    transform: Platform.OS === 'ios' ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [{ scaleX: 1 }, { scaleY: 1 }],
  },
});

export default SettingsScreen;