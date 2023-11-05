import {FlatList, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import SongListView from '../components/SongListView';
import AddQueueService from '../services/AddQueueService';
import {MusicFumesScreenProps} from '../types/navigation';
import {useFileSystemStore} from '../zustand/FileSystemStore';
import {musicTrack} from '../types/data';
import {useDarkMode} from '../zustand/store';
import {Searchbar} from 'react-native-paper';
type renderItemProps = {
  item: musicTrack;
  index: number;
};
const Search = ({navigation}: MusicFumesScreenProps<'Search'>) => {
  const data = useFileSystemStore(state => state.mediaStoreData);
  const themeStyle = useDarkMode();
  const [input, setInput] = useState('');
  const renderItem = useCallback(
    ({item, index}: renderItemProps) => (
      <SongListView
        data={item}
        onPress={() => {
          handlePress(index);
        }}
      />
    ),
    [handlePress],
  );
  const DATA = useMemo(() => {
    return data?.filter(val => {
      if (input === '') {
        return null;
      } else if (
        val.title.toLowerCase().includes(input.toLowerCase()) ||
        val.artist.toLowerCase().includes(input.toLowerCase())
      ) {
        return val;
      }
    });
  }, [input]);
  async function handlePress(startIndex: number) {
    console.log(startIndex);
    await AddQueueService(DATA!, startIndex);
    navigation.navigate('NowPlaying');
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.search__box__container}>
        {/* <TextInput
          style={{
            ...styles.searchBox,
            color: themeStyle.color,
            borderColor: themeStyle.color,
          }}
          placeholder="Search by title,album,artist"
          placeholderTextColor={themeStyle.color}
          value={input}
          onChangeText={setInput}
        /> */}

        <Searchbar
          placeholder="Search by title,album,artist"
          value={input}
          onChangeText={setInput}
        />
      </View>
      {data && (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search__box__container: {
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
});
