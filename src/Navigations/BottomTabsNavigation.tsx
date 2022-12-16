import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteNames } from './Routes';
import MovieOfTheDay from '../Screens/MovieOfTheDay';
import TVSeriesOfTheDay from '../Screens/TVSeriesOfTheDay';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeroStackNavigator from './HeroStackNavigator';

export default function BottomTabsNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={RouteNames.HeroStack}
        options={{
          title: 'Heros',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
        component={HeroStackNavigator}
      />

      <Tab.Screen
        name={RouteNames.MovieOfTheDay}
        options={{
          title: 'Movies',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Entypo name="folder-video" size={size} color={color} />
          ),
        }}
        component={MovieOfTheDay}
      />

      <Tab.Screen
        name={RouteNames.TVSeriesOfTheDay}
        options={{
          title: 'TV Series',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="live-tv" size={size} color={color} />
          ),
        }}
        component={TVSeriesOfTheDay}
      />
      <Tab.Screen
        name={RouteNames.HistoryStack}
        options={{
          title: 'History',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
        component={TVSeriesOfTheDay}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
