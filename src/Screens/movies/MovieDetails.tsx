import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Movie, Search } from '../../models/movies.models';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

export default function MovieDetails() {

  const route = useRoute();
  const movie: Search = route.params?.movie;
  const [currentMovie, setCurrentMovie] = useState<Movie>();

  useEffect(() => {
    console.log('IMDB: ', movie.imdbID);
  }, [movie]);

  const sampleResponse: Movie = { "Title": "Iron Man", "Year": "2008", "Rated": "PG-13", "Released": "02 May 2008", "Runtime": "126 min", "Genre": "Action, Adventure, Sci-Fi", "Director": "Jon Favreau", "Writer": "Mark Fergus, Hawk Ostby, Art Marcum", "Actors": "Robert Downey Jr., Gwyneth Paltrow, Terrence Howard", "Plot": "Tony Stark. Genius, billionaire, playboy, philanthropist. Son of legendary inventor and weapons contractor Howard Stark. When Tony Stark is assigned to give a weapons presentation to an Iraqi unit led by Lt. Col. James Rhodes, he's given a ride on enemy lines. That ride ends badly when Stark's Humvee that he's riding in is attacked by enemy combatants. He survives - barely - with a chest full of shrapnel and a car battery attached to his heart. In order to survive he comes up with a way to miniaturize the battery and figures out that the battery can power something else. Thus Iron Man is born. He uses the primitive device to escape from the cave in Iraq. Once back home, he then begins work on perfecting the Iron Man suit. But the man who was put in charge of Stark Industries has plans of his own to take over Tony's technology for other matters.", "Language": "English, Persian, Urdu, Arabic, Kurdish, Hindi, Hungarian", "Country": "United States, Canada", "Awards": "Nominated for 2 Oscars. 21 wins & 73 nominations total", "Poster": "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg", "Ratings": [{ "Source": "Internet Movie Database", "Value": "7.9/10" }, { "Source": "Rotten Tomatoes", "Value": "94%" }, { "Source": "Metacritic", "Value": "79/100" }], "Metascore": "79", "imdbRating": "7.9", "imdbVotes": "1,056,101", "imdbID": "tt0371746", "Type": "movie", "DVD": "30 Sep 2008", "BoxOffice": "$319,034,126", "Production": "N/A", "Website": "N/A", "Response": "True" };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FastImage
        style={styles.imgStyle}
        source={{ uri: sampleResponse.Poster, priority: FastImage.priority.normal }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={{ flex: 1, marginVertical: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{sampleResponse.Title}</Text>
        <Text style={{ color: 'grey', marginTop: 10 }}>{[sampleResponse.Year, sampleResponse.Runtime, sampleResponse.Rated,].join(' | ')}</Text>
        <Text style={{ marginTop: 10 }}>Released: {sampleResponse.Released} ({moment(sampleResponse.Released, 'DD MMM YYYY').fromNow()})</Text>
        <Text style={{ marginTop: 10 }}>{sampleResponse.Plot}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imgStyle: { width: 300, height: 300, alignSelf: 'center' },
});
