import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from "../config";
import { AuthenticatedUserContext } from "../providers";
import ChatRow from './ChatRow';

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useContext(AuthenticatedUserContext);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
          )
      ),
    [user]
  );

  return matches.length > 0 ? (
    <FlatList
      style={styles.container}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text style={styles.text}>No matches at the moment 😢</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  text: {
    textAlign: 'center',
    padding: 5,
    fontSize:18
  }
})

export default ChatList;