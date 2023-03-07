import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
// import FolderListView from '../../components/FolderListView';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';
import globalStyle from '../../utils/GlobalStyle';
import {FolderStackScreenProps} from '../../types/navigation';
import {musicData} from '../../types/data';
import {useDarkMode} from '../../zustand/store';

const ITEM_HEIGHT = 90;

type renderItemProps = {
  item: musicData;
  index: number;
};

const FolderInner = ({navigation, route}: FolderStackScreenProps<'Music'>) => {
  const themeStyle = useDarkMode();
  async function handlePress(startIndex: number) {
    let track = route.params.data.files;
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }

  const renderItem = useCallback(
    ({item, index}: renderItemProps): JSX.Element => (
      <SongListView
        data={item}
        onPress={() => {
          handlePress(index);
        }}
      />
    ),
    [handlePress],
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.header__container}>
        <Text
          style={{
            ...styles.path__text,
            color: themeStyle.color,
          }}>{`Path: ${route.params.data.path.replace(
          '/storage/emulated/0',
          'internal storage',
        )}`}</Text>
        <View style={[globalStyle.flex__row__start, styles.details__container]}>
          <Text
            style={{
              marginRight: 10,
              color: themeStyle.color,
            }}>{`${route.params.data.totalFiles} songs`}</Text>
          <Text
            style={{
              marginRight: 10,
              color: themeStyle.color,
            }}>{`${route.params.data.totalDuration}`}</Text>
        </View>
      </View>
      {
        <FlatList
          data={route.params.data.files}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      }
    </View>
  );
};

export default FolderInner;

const styles = StyleSheet.create({
  header__container: {
    paddingHorizontal: 12,
    marginVertical: 18,
  },

  details__container: {
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
  },
  path__text: {
    marginBottom: 10,
    color: '#fff',
  },
});
