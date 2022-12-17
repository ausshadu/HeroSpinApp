import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RouteNames } from './Routes';

import HeroDetails from '../Screens/heros/HeroDetails';
import HeroList from '../Screens/heros/HeroList';
import SearchDetails from '../Screens/movies/SearchDetails';

export default function HeroStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.HerosList}>
      <Stack.Screen
        options={{ title: 'Heros' }}
        name={RouteNames.HerosList}
        component={HeroList}
      />
      <Stack.Screen
        name={RouteNames.HeroDetails}
        component={HeroDetails}
        options={({ route }) => ({ title: route?.params?.hero?.name || '-' })}
      />
      <Stack.Screen
        name={RouteNames.RandomMovieScreen}
        component={SearchDetails}
        options={({ route }) => ({
          title: route?.params?.title || '-',
        })}
      />
    </Stack.Navigator>
  );
}
