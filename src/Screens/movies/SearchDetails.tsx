import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { Movie, Search } from '../../models/movies.models';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { DefaultTheme, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@rneui/base';
import { RouteNames } from '../../Navigations/Routes';
import { Icon } from '@rneui/themed';
import { AppConstants, getSavedItem, setSavedItem } from '../../helpers';



export default function SearchDetails() {

  const route = useRoute();
  const titleDetails: Movie = route.params?.movie;
  const fromSreen: string = route.params?.fromSreen || '';

  const summaryInfo = [
    { label: 'Director', value: titleDetails.Director.split(', ').join('\n') },
    { label: 'Actors', value: titleDetails.Actors.split(', ').join('\n') },
    { label: 'Writer', value: titleDetails.Writer.split(', ').join('\n') },
    { label: 'Language(s)', value: titleDetails.Language },
    { label: 'Country', value: titleDetails.Country.split(', ').join('\n') },
    { label: 'Awards', value: titleDetails.Awards },
    { label: 'BoxOffice', value: titleDetails.BoxOffice },
    { label: 'Production', value: titleDetails.Production },
    { label: 'Website', value: titleDetails.Website },
  ];

  const markAsWatched = async () => {
    const rawHistory: string | null = await getSavedItem(AppConstants.WATCH_HISTORY);
    if (typeof rawHistory === 'string' && rawHistory.length) {
      // We have watch history
      const allWatchedMovies: Movie[] = JSON.parse(rawHistory); // Array of movies;
      const idx = allWatchedMovies.findIndex((movie: Movie) => movie.imdbID === titleDetails.imdbID);
      if (idx > -1) {
        // Existing Movie
        allWatchedMovies[idx].UpdatedOn = new Date().getTime();
      } else {
        allWatchedMovies.push({ ...titleDetails, UpdatedOn: new Date().getTime() });
      }
      setSavedItem(AppConstants.WATCH_HISTORY, JSON.stringify(allWatchedMovies));
    } else {
      // We don't have a watch history, create one
      const watchHistoryArray: Movie[] = [{ ...titleDetails, UpdatedOn: new Date().getTime() }];
      setSavedItem(AppConstants.WATCH_HISTORY, JSON.stringify(watchHistoryArray))
        .then(() => Alert.alert('Info', `${titleDetails.Title} marked as watched.`));
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 12 }} contentContainerStyle={{ paddingBottom: 20 }}>
      <FastImage
        style={styles.imgStyle}
        source={{ uri: titleDetails.Poster, priority: FastImage.priority.normal }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={{ flex: 1, marginVertical: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{titleDetails.Title}</Text>
        <Text style={{ color: 'grey', marginTop: 10 }}>
          {[
            titleDetails.Year,
            titleDetails.Runtime,
            titleDetails.Rated,
            `${titleDetails.Released} (${moment(titleDetails.Released, 'DD MMM YYYY').fromNow()})`
          ].join(' • ')}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 10, }}>
          {titleDetails.Genre.split(', ').map(genre => (
            <View key={genre} style={{ height: 30, borderWidth: 1, alignItems: 'center', marginRight: 10, borderRadius: 15, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: DefaultTheme.colors.notification, borderColor: DefaultTheme.colors.notification }}>
              <Text style={{ color: 'white' }}>{genre}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>SUMMARY</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            {summaryInfo.map(({ label, value }) => (
              <View style={{ flexDirection: 'row', marginVertical: 5 }} key={label}>
                <Text style={{ width: '35%', fontWeight: 'bold' }}>{label}</Text>
                <Text style={{ width: '65%' }}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>PLOT</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ marginTop: 10 }}>{titleDetails.Plot}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>RATINGS</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            {titleDetails.Ratings.map(({ Source, Value }) => (
              <View style={{ flexDirection: 'row', marginVertical: 5 }} key={Source}>
                <Text style={{ width: '65%', fontWeight: 'bold' }}>{Source}</Text>
                <Text style={{ width: '35%' }}>{Value}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', marginVertical: 5 }} key={'Metascore'}>
              <Text style={{ width: '65%', fontWeight: 'bold' }}>Metascore</Text>
              <Text style={{ width: '35%' }}>{titleDetails.Metascore}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }} key={'imdbVotes'}>
              <Text style={{ width: '65%', fontWeight: 'bold' }}>IMDB Votes</Text>
              <Text style={{ width: '35%' }}>{titleDetails.imdbVotes}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ backgroundColor: DefaultTheme.colors.primary, padding: 10 }}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>MORE</Text>
          </View>
          <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={async () => {
              const IMDbUrl = `https://www.imdb.com/title/${titleDetails.imdbID}`;
              const canOpen: boolean = await Linking.canOpenURL(IMDbUrl);
              if (canOpen) {
                Linking.openURL(IMDbUrl);
              }
            }}>
              <FontAwesome name="imdb" size={60} />
            </TouchableOpacity>

            {fromSreen === RouteNames.HeroDetails ? <Button
              title="Mark as watched"
              size='sm'
              icon={<MaterialIcons name='done' size={22} color="white" style={{ marginRight: 10 }} />}
              buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
              style={{ marginLeft: 20 }}
              color={DefaultTheme.colors.notification}
              onPress={markAsWatched}
            /> : null}
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imgStyle: { width: 300, height: 300, alignSelf: 'center' },
});
