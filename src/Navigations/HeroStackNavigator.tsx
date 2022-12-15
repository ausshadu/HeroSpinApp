import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RouteNames } from './Routes';

import HeroOfTheDay from '../Screens/heros/HeroOfTheDay';
import HeroDetails from '../Screens/heros/HeroDetails';

export default function HeroStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={RouteNames.HeroOfTheDay}>
      <Stack.Screen
        options={{ title: 'Heros' }}
        name={RouteNames.HeroOfTheDay}
        component={HeroOfTheDay}
      />
      <Stack.Screen
        name={RouteNames.HeroDetails}
        component={HeroDetails}
        options={({ route }) => ({ title: route?.params?.hero?.name || '-' })}
      />
    </Stack.Navigator>
  );
}
