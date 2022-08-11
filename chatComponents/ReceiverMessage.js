import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../config";

const ReceiverMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: message.photoURL }} />
      <Text style={styles.text}>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor: Colors.green,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 15,
    
    marginVertical: 2
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    left: -10
  },
  text: {
    color: 'white'
  }
})

export default ReceiverMessage;
