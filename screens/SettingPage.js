import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { Colors, auth } from "../config";

const SettingPage = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true
    });
  });

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <SafeAreaView>
      <View style={styles.touchableView}>
        <TouchableOpacity
          style={styles.touchableInfo}
          onPress={() => navigation.navigate("Informations")}
        >
          <Ionicons name="person-circle-outline" size={30} color="#4ade80" />
          <Text style={styles.textInfo}>Informations</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.touchableView}>
        <TouchableOpacity style={styles.touchableLogout} onPress={handleLogout}>
          <AntDesign name="logout" size={26} color="#4f46e5" />
          <Text
            style={styles.textLogout}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  touchableView: {
    padding: 2
  },
  touchableInfo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 12
  },
  textInfo: {
    color: Colors.mediumGray,
    paddingLeft: 6,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    margin: 10
  },
  touchableLogout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingLeft: 6,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 12
  },
  textLogout: {
    color: Colors.mediumGray,
    paddingLeft: 7,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    margin: 10
  }
});

export default SettingPage;
