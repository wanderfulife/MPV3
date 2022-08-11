import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from "../screens";
import SettingPage from '../screens/SettingPage';
import ChatScreen from "../screens/ChatScreen";
import MessageScreen from "../screens/MessageScreen";



const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingPage}></Stack.Screen>
      <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
      <Stack.Screen name="Message" component={MessageScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
