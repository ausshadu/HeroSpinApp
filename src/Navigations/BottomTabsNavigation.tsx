import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteNames } from './Routes';
import HeroOfTheDay from '../Screens/HeroOfTheDay';
import MovieOfTheDay from '../Screens/MovieOfTheDay';
import TVSeriesOfTheDay from '../Screens/TVSeriesOfTheDay';

export default function BottomTabsNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={RouteNames.HeroOfTheDay}
        options={{
          headerTitle: 'Hero of the Day',
          title: 'Heros',
        }}
        component={HeroOfTheDay}
      />

      <Tab.Screen
        name={RouteNames.MovieOfTheDay}
        options={{
          headerTitle: 'Movie of the Day',
          title: 'Movies',
        }}
        component={MovieOfTheDay}
      />

      <Tab.Screen
        name={RouteNames.TVSeriesOfTheDay}
        options={{
          headerTitle: 'TV Series of the Day',
          title: 'TV Series',
        }}
        component={TVSeriesOfTheDay}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
