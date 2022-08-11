import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens';
import SettingPage from '../screens/SettingPage';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingPage}></Stack.Screen>
    </Stack.Navigator>
  );
};
