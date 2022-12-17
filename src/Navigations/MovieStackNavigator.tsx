import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RouteNames } from './Routes';

import MovieOfTheDay from '../Screens/movies/MovieOfTheDay';
import MovieDetails from '../Screens/movies/MovieDetails';

export default function MovieStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.MovieOfTheDay}>
      <Stack.Screen
        options={{ title: 'Movies' }}
        name={RouteNames.MovieOfTheDay}
        component={MovieOfTheDay}
      />
      <Stack.Screen
        name={RouteNames.MovieDetails}
        component={MovieDetails}
        options={({ route }) => ({ title: route?.params?.title || '-' })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
