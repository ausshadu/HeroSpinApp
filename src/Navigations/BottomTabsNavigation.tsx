import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteNames } from './Routes';
import MovieOfTheDay from '../Screens/MovieOfTheDay';
import TVSeriesOfTheDay from '../Screens/TVSeriesOfTheDay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeroStackNavigator from './HeroStackNavigator';

export default function BottomTabsNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={RouteNames.HeroStack}
        options={{
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
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="live-tv" size={size} color={color} />
          ),
        }}
        component={TVSeriesOfTheDay}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
