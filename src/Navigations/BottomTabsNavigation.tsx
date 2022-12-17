import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteNames } from './Routes';
import TVSeriesOfTheDay from '../Screens/TVSeriesOfTheDay';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeroStackNavigator from './HeroStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import HistoryStack from './HistoryStack';

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
        name={RouteNames.SearchStack}
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Entypo name="folder-video" size={size} color={color} />
          ),
        }}
        component={SearchStackNavigator}
      />

      <Tab.Screen
        name={RouteNames.HistoryStack}
        options={{
          title: 'Watch History',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
        component={HistoryStack}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
