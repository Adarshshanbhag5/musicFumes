import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import SongListView from '../components/SongListView';
import AddQueueService from '../services/AddQueueService';
import {MusicFumesScreenProps} from '../types/navigation';
import {useFileSystemStore} from '../zustand/FileSystemStore';
import {musicData} from '../types/data';
import {useDarkMode} from '../zustand/store';
type renderItemProps = {
  item: musicData;
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
        <TextInput
          style={{
            ...styles.searchBox,
            color: themeStyle.color,
            borderColor: themeStyle.color,
          }}
          placeholder="Search by title,album,artist"
          placeholderTextColor={themeStyle.color}
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
    marginBottom: 20,
    alignItems: 'center',
  },
  searchBox: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    marginTop: 20,
    width: '90%',
    borderWidth: 1,
    borderRadius: 8,
  },
});
