import { View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Header from "../chatComponents/Header";
import ChatList from "../chatComponents/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header title="Chat" />
        <ChatList />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  }
});
export default ChatScreen;
