import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

const ChatScreen = ({ navigateTo, product, messages, user, seller, setMessages }) => {
  const [chatInput, setChatInput] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;

    const newChatMessage = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      receiverId: seller.id,
      text: chatInput,
      productId: product.id,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, newChatMessage]);
    setChatInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.fullScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
    >
      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeIn.duration(500)} style={styles.chatHeader}>
          <TouchableOpacity onPress={() => navigateTo('productDetail', { product })} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigateTo('sellerProfile', { seller })} style={styles.chatHeaderInfo}>
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: seller.profilePic }} style={styles.chatSellerProfilePic} />
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.chatHeaderText}>{seller.name}</Text>
              <Text style={styles.onlineStatus}>Online</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigateTo('home')} style={styles.homeButton}>
            <MaterialIcons name="home" size={28} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>

      <View style={styles.chatBackground}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item, index }) => (
            <Animated.View 
              entering={FadeIn.delay(100)} 
              exiting={FadeOut} 
              style={[
                styles.messageBubble, 
                item.senderId === user.id ? styles.myMessage : styles.theirMessage,
                index === 0 && styles.firstMessage
              ]}
            >
              <Text style={item.senderId === user.id ? styles.myMessageText : styles.theirMessageText}>{item.text}</Text>
              <Text style={[styles.messageTimestamp, item.senderId === user.id ? styles.myTimestamp : styles.theirTimestamp]}>
                {item.timestamp ? format(new Date(item.timestamp), 'h:mm a') : ''}
              </Text>
            </Animated.View>
          )}
          keyExtractor={item => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.messageInput}
            value={chatInput}
            onChangeText={setChatInput}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity onPress={handleSendMessage} style={[styles.sendButton, chatInput.trim() === '' && styles.sendButtonDisabled]}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    backgroundColor: '#6a51ed',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
    backgroundColor: '#6a51ed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    padding: 5,
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  chatSellerProfilePic: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#fff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4cd964',
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  chatHeaderText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 2,
  },
  onlineStatus: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  homeButton: {
    padding: 5,
  },
  chatBackground: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },
  messageBubble: {
    padding: 16,
    borderRadius: 24,
    maxWidth: '80%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  firstMessage: {
    marginTop: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6a51ed',
    borderBottomRightRadius: 8,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
  },
  myMessageText: {
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  theirMessageText: {
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
  messageTimestamp: {
    fontSize: 11,
    marginTop: 6,
    opacity: 0.7,
  },
  myTimestamp: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'right',
  },
  theirTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'left',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 28,
    paddingHorizontal: 5,
  },
  messageInput: {
    flex: 1,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 50,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: '#6a51ed',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  sendButtonDisabled: {
    backgroundColor: '#a9a1f8',
  },
});

export default ChatScreen;