import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteNames } from './Routes';
import HistoryScreen from '../Screens/history/HistoryScreen';
import SearchDetails from '../Screens/movies/SearchDetails';

export default function HistoryStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.HistoryScreen}>
      <Stack.Screen
        options={{ title: 'Watch History' }}
        name={RouteNames.HistoryScreen}
        component={HistoryScreen}
      />
      <Stack.Screen
        name={RouteNames.SearchDetails}
        component={SearchDetails}
        options={({ route }) => ({ title: route?.params?.title || '-' })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({})