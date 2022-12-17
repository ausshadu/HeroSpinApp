import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import HerosRawData from '../../MockData/heros.json';

import { Hero } from '../../models/hero.model';
import { randomNumberFromInterval, Sizes } from '../../helpers';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DefaultTheme, useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Navigations/Routes';
import HeroOfTheDay from './HeroOfTheDay';
import { SearchBar } from '@rneui/themed';


export default function HeroList(props: any) {
  const navigation = useNavigation();
  const MAX_HEROS = (HerosRawData as Hero[]).length;
  const [herosList, setHerosList] = useState<Hero[]>(HerosRawData as Hero[]);
  const [randomHeroIndex, setRandomHeroIndex] = useState(randomNumberFromInterval(0, MAX_HEROS - 1));
  const [searchText, setSearchText] = useState('');

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
          {hero.biography.fullName && <Text style={{ maxWidth: '75%' }}>{hero.biography.fullName}</Text>}
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

  const updateSearch = (text: string) => {
    setSearchText(text);
    // Search either in name or in full name
    setHerosList(
      HerosRawData.filter(hero => {
        return hero.name.toLowerCase().indexOf(text.toLowerCase()) > -1
          || hero.biography.fullName.toLowerCase().indexOf(text.toLowerCase()) > -1
      }) as Hero[]
    );
  }

  return (
    <View style={styles.container}>

      <SearchBar
        placeholder="Search a hero"
        onChangeText={updateSearch}
        value={searchText}
        containerStyle={{ backgroundColor: 'white', borderWidth: 1, padding: 0 }}
        inputContainerStyle={{ backgroundColor: DefaultTheme.colors.background }}
      />
      <View style={{ marginVertical: 10 }} />

      <HeroOfTheDay hero={HerosRawData[randomHeroIndex]} />

      <FlatList
        data={herosList}
        renderItem={({ item }) => renderHeroCard(item)}
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
