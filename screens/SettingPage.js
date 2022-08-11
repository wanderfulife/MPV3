import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, AntDesign } from "@expo/vector-icons"; 
import { signOut } from "firebase/auth";


const SettingPage = ({navigation}) => {

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
      <View className="p-2">
        <TouchableOpacity
          className="w-full  p-3 pt-5 rounded-xl border-b flex-row items-center"
          onPress={() => navigation.navigate("Informations")}
        >
          <Ionicons name="person-circle-outline" size={26} color="#4ade80" />
          <Text className="text-gray-400 pl-3 text-xl font-bold text-center">
            Informations
          </Text>
        </TouchableOpacity>
      </View>
      <View className="p-2">
        <TouchableOpacity
          className="w-full  p-3 rounded-xl border-b flex-row items-center"
          onPress={handleLogout}
        >
          <AntDesign name="logout" size={22} color="#4f46e5" />
          <Text className="text-gray-400 pl-4 text-xl font-bold text-center">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SettingPage