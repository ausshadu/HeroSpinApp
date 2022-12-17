import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Hero } from '../../models/hero.model';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Sizes } from '../../helpers';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Navigations/Routes';

export default function HeroOfTheDay(props: any) {
  const hero = props.hero as Hero;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ borderColor: 'grey', borderWidth: 1, padding: 5, marginBottom: 20, paddingBottom: 10, backgroundColor: 'white' }}
      onPress={() => navigation.navigate(RouteNames.HeroDetails, { hero })}
    >

      <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 10, }}>HERO OF THE DAY</Text>
      <View style={{ flexDirection: 'row' }}>

        <FastImage
          style={{ width: 200, height: 200, justifyContent: 'center', alignSelf: 'center', paddingTop: 12 }}
          source={{ uri: hero.images.lg, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, }}>{hero.name.toUpperCase()}</Text>
          {hero.biography.fullName && <Text style={{ maxWidth: '70%' }}>{hero.biography.fullName}</Text>}
          {hero.biography.aliases.length && <Text style={{ maxWidth: '65%', color: 'grey' }}>{hero.biography.aliases.join(', ')}</Text>}
        </View>
      </View>
    </TouchableOpacity >
  );

}

const styles = StyleSheet.create({

});
