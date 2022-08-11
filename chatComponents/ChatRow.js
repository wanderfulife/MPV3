import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedUserContext } from "../providers";
import getMatchedUserInfo from "../Lib/getMatchedUserInfo";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthenticatedUserContext);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState();

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
        
      ),
    [matchDetails, db]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails
        })
      }
    >
      <Image
        style={styles.image}
        source={{
          uri: matchedUserInfo?.photoURL
        }}
      />
      <View>
        <Text style={styles.text}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
   
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 10,
    backgroundColor: 'white',
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: '10%'
  },
  image: {
    borderRadius: 100,
    height: 65,
    width: 65,
    marginRight: 15
  },
  text: {
    fontWeight: '600',
    fontSize: 20
  }
});

export default ChatRow;
