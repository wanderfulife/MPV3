import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import {  } from "../components";


import { auth, Colors } from '../config';

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="Sign Out"
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  

});
