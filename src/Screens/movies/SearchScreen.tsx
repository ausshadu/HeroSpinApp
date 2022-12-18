import React, { useEffect, useState, useRef } from 'react'
import { Platform, StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native'
import { AutocompleteDropdown, AutocompleteDropdownRef, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';
import HerosRawData from '../../MockData/heros.json';
import { Hero } from '../../models/hero.model';
import { ApiCall } from '../../helpers';

import Feather from 'react-native-vector-icons/Feather';
import { Movie, Search, SearchError, SearchResults } from '../../models/movies.models';
import FastImage from 'react-native-fast-image';
import { AxiosResponse } from 'axios';
Feather.loadFont();

import { DefaultTheme, useNavigation } from '@react-navigation/native';
import { ButtonGroup } from '@rneui/themed';
import { RouteNames } from '../../Navigations/Routes';


export default function SearchScreen() {

  const [selectedItem, setSelectedItem] = useState<TAutocompleteDropdownItem>(null);
  const [herosList, setHerosList] = useState<TAutocompleteDropdownItem[]>([]);
  const dropdownController = useRef<AutocompleteDropdownRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  const [movieResults, setMovieResults] = useState<Search[]>([]);
  const [filterIndex, setFilterIndex] = useState<number>(0);
  const searchTypes: string[] = ['movie', 'series', 'episode'];

  useEffect(() => {
    setHerosList(
      (HerosRawData as Hero[])
        .map((hero: Hero) => ({
          id: hero.slug,
          title: JSON.stringify({
            name: hero.name,
            fullName: hero.biography.fullName
          })
        }))
    );
  }, []);

  const renderMovieCard = (movie: Search) => {
    return (
      <TouchableOpacity
        key={movie.imdbID}
        style={{ flexDirection: 'row' }}
        onPress={() => {
          setIsLoading(true);
          ApiCall({ url: `?i=${movie.imdbID}&plot=full` })
            .then((res: AxiosResponse<Movie | SearchError>) => {
              if ('Error' in res.data) {
                // No results found
                console.log('No Results');
                setMovieResults([]);
              } else {
                if (res.data) {
                  navigation.navigate(RouteNames.SearchDetails, { title: movie.Title, movie: res.data });
                }
              }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
        }}
      >
        <FastImage
          style={styles.imgStyle}
          source={{ uri: movie.Poster, priority: FastImage.priority.normal }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{movie.Title}</Text>
          <Text style={{ color: 'grey', marginTop: 10 }}>Year: {movie.Year}</Text>
          <View style={{
            height: 25,
            width: 100,
            borderRadius: 15,
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            backgroundColor: movie.Type === 'movie' ? DefaultTheme.colors.primary : DefaultTheme.colors.notification,
          }}>
            <Text>{movie.Type.toUpperCase()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View style={[styles.section, Platform.select({ ios: { zIndex: 10 } })]}>
        <AutocompleteDropdown
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          debounce={300}
          ChevronIconComponent={<Feather name="chevron-down" size={20} color="black" />}
          ClearIconComponent={<Feather name="x-circle" size={18} color="red" />}
          controller={(controller: AutocompleteDropdownRef) => dropdownController.current = controller}
          textInputProps={{
            placeholder: 'Search by a movie or series',
            style: { backgroundColor: 'white' }
          }}
          rightButtonsContainerStyle={{ backgroundColor: 'white' }}
          inputContainerStyle={{ backgroundColor: 'white' }}
          renderItem={({ id, title }) => {
            if (title && title?.length) {
              const { name, fullName } = JSON.parse(title);
              return (
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 16 }}>{name}</Text>
                  {fullName && <Text style={{ color: 'grey' }}>{`a.k.a ${fullName}`}</Text>}
                </View>
              )
            }
            return <View />;
          }}
          onSelectItem={(item: TAutocompleteDropdownItem) => {
            if (!item || item === null) return;

            setSelectedItem(item);
            if (item && item.title) {
              const { name, fullName } = JSON.parse(item.title);
              setTimeout(() => dropdownController.current?.setInputText(name), 0);
              setIsLoading(true);
              ApiCall({ url: `?s=${name.toLowerCase()}&type=${searchTypes[filterIndex]}` })
                .then((res: AxiosResponse<SearchResults | SearchError>) => {
                  if ('Error' in res.data) {
                    // No results found
                    console.log('No Results');
                  } else {
                    if (res.data.Search.length) {
                      console.log(res.data.Search);
                      setMovieResults(res.data.Search);
                    }
                  }
                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
            }
          }}
          dataSet={herosList}
        />

        <ButtonGroup
          buttons={searchTypes}
          selectedIndex={filterIndex}
          selectedButtonStyle={{ backgroundColor: DefaultTheme.colors.primary }}
          onPress={(value) => setFilterIndex(value)}
          containerStyle={{ marginBottom: 20 }}
        />
      </View>

      <FlatList
        data={movieResults || []}
        renderItem={({ item }) => renderMovieCard(item)}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
      {isLoading && <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', height: dimensions.height, width: dimensions.width, zIndex: 99 }}>
        <ActivityIndicator size="large" color={DefaultTheme.colors.primary} />
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 40
  },
  itemSeparator: {
    height: 10,
  },
  imgStyle: { width: 130, height: 130, marginRight: 10 },
})