import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteNames } from './Routes';
import HistoryScreen from '../Screens/history/HistoryScreen';

export default function HistoryStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.HistoryScreen}>
      <Stack.Screen
        options={{ title: 'Watch History' }}
        name={RouteNames.HistoryScreen}
        component={HistoryScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})