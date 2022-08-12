import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {  Colors } from '../config';



const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;
  return (
    <View style={styles.screnTransparent}>
      <View style={styles.container} >
        <Text style={styles.textMatch}>
          New Match !
        </Text>
        <Text style={styles.text} >
         {userSwiped.displayName} and you want to work together.
        </Text>
      </View>
      <View style={styles.imageContainer} >
       {userSwiped.photoURL && <Image
        style={styles.image}
          source={{ uri: loggedInProfile.photoURL }}
        />}
        {userSwiped.photoURL && <Image
         style={styles.image}
         
          source={{ uri: userSwiped.photoURL }}
        />}
      </View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text style={styles.textBottom}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;

const styles = StyleSheet.create({
  screnTransparent: {
    backgroundColor: Colors.purple,
    paddingTop: "20%",
    opacity: 0.96,
    height: '100%'
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  textMatch: {
color: Colors.green,
  fontSize: 55,
    textAlign: 'center',
    fontWeight: '700'
  },
  text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10
  },
    textBottom: {
    textAlign:'center',
    fontWeight: '700',
    color: Colors.green
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  image: {
      height: 150,
      width: 150,
      borderRadius: 100
  },
  touchable: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: 40,
    paddingVertical:30,
    paddingHorizontal: 7,
    borderRadius: 100,
    alignItems: 'center'
  }

});
