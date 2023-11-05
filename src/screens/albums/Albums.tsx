import {FlatList, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useFileSystemStore} from '../../zustand/FileSystemStore';
import {useDarkMode} from '../../zustand/store';
import {AlbumStackScreenProps} from '../../types/navigation';
import AlbumView from '../../components/AlbumView';
import {musicTrack} from '../../types/data';
import {Searchbar} from 'react-native-paper';

type renderItemProp = {
  item: [string, musicTrack[]];
};

const Albums = ({navigation}: AlbumStackScreenProps<'albums'>) => {
  const data = useFileSystemStore(state => state.albums);
  const themeStyle = useDarkMode();
  const [input, setInput] = useState('');

  function handlePress(data: musicTrack[]) {
    navigation.navigate('albumList', {data});
  }

  const renderItem = useCallback(
    ({item}: renderItemProp) => (
      <AlbumView
        name={item[0]}
        album={item[1]}
        onPress={() => {
          handlePress(item[1]);
        }}
      />
    ),
    [handlePress],
  );

  const DATA = useMemo(() => {
    return data.filter(val => {
      if (input === '') {
        return val;
      } else if (val[0].toLowerCase().includes(input.toLowerCase())) {
        return val;
      }
    });
  }, [input]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.search__box__container}>
        {/* <TextInput
          style={{
            ...styles.searchBox,
            color: themeStyle.color,
            borderColor: themeStyle.color,
          }}
          placeholder="Search by album"
          placeholderTextColor={themeStyle.color}
          value={input}
          onChangeText={setInput}
        /> */}
        <Searchbar
          placeholder="Search by album"
          value={input}
          onChangeText={setInput}
        />
      </View>
      {data && (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Albums;

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
