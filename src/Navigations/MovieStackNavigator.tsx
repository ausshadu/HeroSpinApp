import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RouteNames } from './Routes';

import MovieOfTheDay from '../Screens/MovieOfTheDay';

export default function MovieStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.MovieOfTheDay}>
      <Stack.Screen
        name={RouteNames.MovieOfTheDay}
        component={MovieOfTheDay}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
