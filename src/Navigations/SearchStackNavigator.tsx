import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RouteNames } from './Routes';

import MovieOfTheDay from '../Screens/movies/MovieOfTheDay';
import SearchDetails from '../Screens/movies/SearchDetails';

export default function SearchStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.MovieOfTheDay}>
      <Stack.Screen
        options={{ title: 'Search a movie, series or episode' }}
        name={RouteNames.MovieOfTheDay}
        component={MovieOfTheDay}
      />
      <Stack.Screen
        name={RouteNames.SearchDetails}
        component={SearchDetails}
        options={({ route }) => ({ title: route?.params?.title || '-' })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
