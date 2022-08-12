import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from "../screens";
import SettingPage from '../screens/SettingPage';
import ChatScreen from "../screens/ChatScreen";
import MessageScreen from "../screens/MessageScreen";
import MatchedScreen from "../screens/MatchedScreen";
import SettingScreen from "../screens/SettingScreen";
import InformationScreen from "../screens/InformationScreen";






const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SettingPage"  component={SettingPage}></Stack.Screen>
      <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
      <Stack.Screen name="Message" component={MessageScreen}></Stack.Screen>
         <Stack.Screen
              name="Settings"
              component={SettingScreen}
      ></Stack.Screen>
       <Stack.Screen
              name="Information"
              component={InformationScreen}
      ></Stack.Screen>
    <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Match" component={MatchedScreen}></Stack.Screen>
          </Stack.Group>
   
   

    </Stack.Navigator>
   
        

  );
};
