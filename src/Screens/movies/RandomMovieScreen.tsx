import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export default function RandomMovieScreen() {

  const navigation = useNavigation();

  return (
    <View>
      <Text>RandomMovieScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({})