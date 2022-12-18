import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Movie } from '../../models/movies.models';
import { AppConstants, clearSavedData, getSavedItem } from '../../helpers';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { DefaultTheme, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../Navigations/Routes';
import { Button } from '@rneui/themed';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function HistoryScreen() {

  const [movieHistory, setMovieHistory] = useState<Movie[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    (async () => {
      try {
        const rawHistory: string | null = await getSavedItem(AppConstants.WATCH_HISTORY)
        if (typeof rawHistory === 'string' && rawHistory.length) {
          // We have watch history
          const allWatchedMovies: Movie[] = JSON.parse(rawHistory); // Array of movies;
          if (allWatchedMovies && allWatchedMovies.length) {
            setMovieHistory(allWatchedMovies);
          }
        }
      } catch (error) {
        console.log('Error', error);
      }
    })();
  });

  const renderMovieCard = (movie: Movie) => {
    return (
      <TouchableOpacity
        key={movie.imdbID}
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate(RouteNames.SearchDetails, { title: movie.Title, movie })}
      >
        <FastImage
          style={styles.imgStyle}
          source={{ uri: movie.Poster, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{movie.Title}</Text>
          <Text style={{ color: 'grey', marginTop: 10 }}>Year: {movie.Year}</Text>
          <Text style={{ color: 'grey', marginTop: 10 }}>Last Updated: {moment(movie.UpdatedOn).fromNow()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const showEmptyList = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 16 }}>You don't have a watch history. Add "Mark as watched" to create one.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={movieHistory || []}
        renderItem={({ item }) => renderMovieCard(item)}
        ListEmptyComponent={showEmptyList}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
      {movieHistory.length ? (<View>
        <Button
          title="Clear History"
          size='sm'
          icon={<EvilIcons name='trash' size={22} color="white" style={{ marginRight: 10 }} />}
          color={DefaultTheme.colors.notification}
          onPress={() => {
            Alert.alert('Warning', 'Do you want to clear watch history?', [
              { text: 'No', onPress: () => { }, style: 'cancel' },
              {
                text: 'Yes', onPress: async () => {
                  await clearSavedData();
                  setMovieHistory([]);
                  Alert.alert('Info', 'Watch history cleared.');
                }, style: 'destructive'
              },
            ]);
          }}
        />
      </View>) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: 10,
  },
  imgStyle: { width: 130, height: 130, marginRight: 10 },
});
