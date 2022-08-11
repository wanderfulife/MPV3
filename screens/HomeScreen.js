import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text
} from "react-native";

import { AuthenticatedUserContext } from "../providers";

import { auth, Colors } from "../config";
import { Ionicons } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="ios-settings-outline" size={32} color="#4ade80" />
        </TouchableOpacity>

        <Text style={styles.logo}>MORE PAY</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={32} color="#4ade80" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  logo: {
    color: Colors.green,
    fontWeight: '700',
    fontSize:  24 ,
    lineHeight: 32
  }
});

const logo = "text-green-400 font-bold text-2xl";
const safeArea = "flex-1";

