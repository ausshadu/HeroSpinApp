import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RouteNames } from './Routes';

import SearchScreen from '../Screens/movies/SearchScreen';
import SearchDetails from '../Screens/movies/SearchDetails';
import RandomMovieScreen from '../Screens/movies/RandomMovieScreen';

export default function SearchStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.SearchScreen}>
      <Stack.Screen
        options={{ title: 'Search a movie, series or episode' }}
        name={RouteNames.SearchScreen}
        component={SearchScreen}
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
