import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Movie, Search } from '../../models/movies.models';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

export default function SearchDetails() {

  const route = useRoute();
  const titleDetails: Movie = route.params?.movie;

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
  ]

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
            <View style={{ height: 30, borderWidth: 1, alignItems: 'center', marginRight: 10, borderRadius: 15, paddingVertical: 5, paddingHorizontal: 10, }}>
              <Text>{genre}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ backgroundColor: 'black', padding: 10 }}>
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
          <View style={{ backgroundColor: 'black', padding: 10 }}>
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>PLOT</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ marginTop: 10 }}>{titleDetails.Plot}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ backgroundColor: 'black', padding: 10 }}>
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

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imgStyle: { width: 300, height: 300, alignSelf: 'center' },
});
