import {
  View,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  StyleSheet
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../chatComponents/Header";
import getMatchedUserInfo from "../Lib/getMatchedUserInfo";
import { AuthenticatedUserContext } from "../providers";
import { useRoute } from "@react-navigation/native";
import SenderMessage from "../chatComponents/SenderMessage";
import ReceiverMessage from "../chatComponents/ReceiverMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { Colors, db } from "../config";

const MessageScreen = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { matchDetails } = params;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
   if (input !== "") { addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input
    })};

    setInput("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted={-1}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
            style={styles.flat}
          ></FlatList>
        </TouchableWithoutFeedback>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="Send Message ..."
            placeholderTextColor={Colors.mediumGray}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button title="send" color="#4ade80" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 5
  },
  keyboard: {
    flex: 1
  },
  flat: {
    paddingLeft: 4
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputText: {
    fontSize: 20
  }
});

export default MessageScreen;
