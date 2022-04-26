import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './Pages/HomePage';
import MapPage from './Pages/MapPage';

const Stack = createNativeStackNavigator();

export default function MainRouter() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomePage' >
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="MapPage" component={MapPage} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}