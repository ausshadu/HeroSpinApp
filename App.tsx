import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigation from './src/Navigations/BottomTabsNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
