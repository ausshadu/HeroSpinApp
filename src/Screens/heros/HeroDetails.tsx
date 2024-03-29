import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions, ActivityIndicator, Alert } from 'react-native';
import { Hero } from '../../models/hero.model';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { DefaultTheme, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { RouteNames } from '../../Navigations/Routes';
import { ApiCall, randomNumberFromInterval } from '../../helpers';
import { AxiosResponse } from 'axios';
import { Movie, Search, SearchError, SearchResults } from '../../models/movies.models';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HeroDetails(props: any) {
  const hero = props.route.params?.hero as Hero;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const biographyInfo = [
    { label: 'Full name', value: hero.biography.fullName },
    { label: 'Alias', value: hero.biography.aliases.join(', ') },
    { label: 'Alter ego(s)', value: hero.biography.alterEgos },
    { label: 'Place of birth', value: hero.biography.placeOfBirth },
    { label: 'Occupation', value: hero.work.occupation },
    { label: 'Alignment', value: hero.biography.alignment },
    { label: 'Based at', value: hero.work.base.split('; ').join('\n') },
    { label: 'Publisher', value: hero.biography.publisher },
    { label: '1st appearance', value: hero.biography.firstAppearance },
  ];

  const powerStatInfo = [
    { label: 'Combat', value: hero.powerstats.combat },
    { label: 'Durability', value: hero.powerstats.durability },
    { label: 'Intelligence', value: hero.powerstats.intelligence },
    { label: 'Power', value: hero.powerstats.power },
    { label: 'Speed', value: hero.powerstats.speed },
    { label: 'Strength', value: hero.powerstats.strength },
  ];

  const appearanceInfo = [
    { label: 'Gender', value: hero.appearance.gender },
    { label: 'Race', value: hero.appearance.race || '-' },
    { label: 'Height', value: hero.appearance.height.join(' or ') },
    { label: 'Weight', value: hero.appearance.weight.join(' or ') },
    { label: 'Eye color', value: hero.appearance.eyeColor },
    { label: 'Hair color', value: hero.appearance.hairColor },
  ];

  const connectionsInfo = [
    { label: 'Affiliations', value: hero.connections.groupAffiliation },
    { label: 'Relatives', value: hero.connections.relatives },
  ];

  const showRandomMovie = async () => {
    setIsLoading(true);
    let allMovies = await ApiCall({ url: `?s=${hero.name.toLowerCase()}&type=movie` });
    if ('Error' in allMovies.data) {
      Alert.alert('Error', (allMovies.data as SearchError).Response);
      setIsLoading(false);
      return;
    } else {
      const MAX_MOVIES = allMovies.data.Search.length;
      const randomMovie = allMovies.data.Search[randomNumberFromInterval(0, MAX_MOVIES - 1)] as Search;
      let movieDetails = await ApiCall({ url: `?i=${randomMovie.imdbID}&plot=full` });
      if ('Error' in movieDetails.data) {
        Alert.alert('Error', (movieDetails.data as SearchError).Response);
        setIsLoading(false);
        return;
      } else {
        const movie = movieDetails.data as Movie;
        setIsLoading(false);
        navigation.navigate(RouteNames.RandomMovieScreen, {
          title: movie.Title,
          movie,
          fromSreen: RouteNames.HeroDetails,
        });
      }
    }
  };

  const showAllMovies = () => {

  };

  return (
    <>
      <ScrollView>
        <FastImage
          style={{ width: 300, height: 300, justifyContent: 'center', alignSelf: 'center', paddingTop: 12 }}
          source={{ uri: hero.images.lg, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={{ padding: 12 }}>

          <View style={{ marginTop: 20 }}>

            <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>POWERSTATS</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>

              {powerStatInfo.map(({ label, value }) => (
                <View
                  style={{ marginVertical: 5, flex: 1, alignItems: 'center' }}
                  key={label}>
                  <Progress.Circle
                    showsText={true}
                    formatText={_ => value + '%'}
                    size={50}
                    progress={value / 100}
                    textStyle={{ fontSize: 14 }}
                    color={DefaultTheme.colors.notification}
                  />
                  <Text style={{ fontSize: 10, marginTop: 10 }}>{label}</Text>
                </View>
              ))}
            </View>

          </View>

          <View style={{ marginTop: 20 }}>
            <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>BIOGRAPHY</Text>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
              {biographyInfo.map(({ label, value }) => (
                <View style={{ flexDirection: 'row', marginVertical: 5 }} key={label}>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>{label}</Text>
                  <Text style={{ width: '65%' }}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>APPEARANCE</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              {appearanceInfo.map(({ label, value }) => (
                <View style={{ flexDirection: 'row', marginVertical: 5 }} key={label}>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>{label}</Text>
                  <Text style={{ width: '65%' }}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>CONNECTIONS</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              {connectionsInfo.map(({ label, value }) => (
                <View style={{ flexDirection: 'row', marginVertical: 5 }} key={label}>
                  <Text style={{ width: '35%', fontWeight: 'bold' }}>{label}</Text>
                  <Text style={{ width: '65%' }}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>WHAT TO WATCH? 🤔</Text>
            </View>
            <View style={{ padding: 10, flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
              <Button
                title="Random Movie"
                size="sm"
                icon={<MaterialIcons name='movie' size={22} color="white" style={{ marginRight: 10 }} />}
                style={{ width: dimensions.width / 2 }}
                color={DefaultTheme.colors.notification}
                onPress={showRandomMovie}
              />
              {/* <Button
                title="Show all"
                size="sm"
                style={{ width: dimensions.width / 2.5 }}
                color={DefaultTheme.colors.text}
                onPress={showAllMovies}
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
      {isLoading && <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', height: dimensions.height - 100, width: dimensions.width, zIndex: 99 }}>
        <ActivityIndicator size="large" color={DefaultTheme.colors.primary} />
      </View>}
    </>
  )
}

const styles = StyleSheet.create({});
