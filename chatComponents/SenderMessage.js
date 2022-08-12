import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../config';

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.container} className="ml-auto self-start bg-indigo-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2">
      <Text style={styles.text}>{message.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
     borderRadius: 5,
    backgroundColor: Colors.purple,
    borderTopRightRadius: 0,
    padding: 10,
    marginHorizontal: 3,
    marginLeft: 'auto',
    marginVertical: 2
  },
  text: {
    color: 'white',
    fontWeight: '600'
  }
});

export default SenderMessage

// const styles = StyleSheet.create({
//   container: {
//     alignSelf: "flex-start",
//     backgroundColor: Colors.green,
//     borderRadius: 5,
//     borderTopLeftRadius: 0,
//     paddingHorizontal: 5,
//     paddingVertical: 3,
//     marginHorizontal: 15,
//     marginLeft: -1,
//     marginVertical: 2
//   },
//   text: {
//     color: 'white'
//   }
// })