import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import HerosRawData from '../../MockData/heros.json';

import { Hero } from '../../models/hero.model';
import { randomNumberFromInterval, Sizes } from '../../helpers';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Navigations/Routes';
import HeroOfTheDay from './HeroOfTheDay';


export default function HeroList(props: any) {
  const navigation = useNavigation();
  const MAX_HEROS = (HerosRawData as Hero[]).length;
  const randomHeroIndex = randomNumberFromInterval(0,MAX_HEROS-1);

  const renderHeroCard = (hero: Hero) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate(RouteNames.HeroDetails, { hero })}
      >
        <FastImage
          style={styles.imgStyle}
          source={{
            uri: hero.images.lg,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{hero.name.toUpperCase()}</Text>
          {hero.biography.fullName && <Text style={{}}>{hero.biography.fullName}</Text>}
          {hero.biography.aliases.length && <Text style={{ maxWidth: '75%', color: 'grey' }}>{hero.biography.aliases.join(', ')}</Text>}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Sizes.small }}>
            {
              hero.appearance.gender === 'Male' ? <MaterialCommunityIcons name="gender-male" size={20} />
                : hero.appearance.gender === 'Female' ? <MaterialCommunityIcons name="gender-female" size={20} />
                  : <FontAwesome name="genderless" size={20} />}
            <Text style={{ marginLeft: 5 }}>{hero.appearance.gender} {hero.appearance.race ? '| ' + hero.appearance.race : ''}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={(HerosRawData as Hero[]) || []}
        renderItem={({ item }) => renderHeroCard(item)}
        ListHeaderComponent={() => <HeroOfTheDay hero={HerosRawData[randomHeroIndex]} />}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  itemSeparator: {
    height: 10,
  },
  imgStyle: { width: 130, height: 130 },
});
