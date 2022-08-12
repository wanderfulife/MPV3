import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../config";

const ReceiverMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: message.photoURL }}/>
      <Text style={styles.text}>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",

    backgroundColor: Colors.green,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    padding: 10,
    marginHorizontal: 15,
    marginLeft: 30,
    marginVertical: 2
  },
  text: {
    color: 'white',
    fontWeight: '600'
  },
  image: {
    position: "absolute",
    top: 3,
    borderRadius: 100,
    left: -32,
    height: 30,
    width: 30,
  }
})

export default ReceiverMessage;
