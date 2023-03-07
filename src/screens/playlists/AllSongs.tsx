import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';
import convertMsToTime from '../../utils/DurationFromater';
import globalStyle from '../../utils/GlobalStyle';
import {PlaylistStackScreenProps} from '../../types/navigation';
import {useFileSystemStore} from '../../zustand/FileSystemStore';
import {musicData} from '../../types/data';
import {useDarkMode} from '../../zustand/store';

const ITEM_HEIGHT = 90;

type renderItemProps = {
  item: musicData;
  index: number;
};

const AllSongs = ({navigation}: PlaylistStackScreenProps<'AllSongs'>) => {
  const data = useFileSystemStore(state => state.mediaStoreData);
  const themeStyle = useDarkMode();
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
  async function handlePress(startIndex: number) {
    await AddQueueService(data!, startIndex);
    navigation.navigate('NowPlaying');
  }

  return (
    <View style={{flex: 1}}>
      <View style={[globalStyle.flex__row__start, styles.innerContainer]}>
        <Text
          style={{
            ...styles.inner__container__text,
            color: themeStyle.color,
          }}>{`${data?.length} songs`}</Text>
        <Text
          style={{...styles.inner__container__text, color: themeStyle.color}}>
          {convertMsToTime(
            data!.reduce((total, val) => val.duration + total, 0),
          )}
        </Text>
      </View>
      {data && (
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          renderItem={renderItem}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      )}
    </View>
  );
};

export default AllSongs;

const styles = StyleSheet.create({
  innerContainer: {
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
    paddingHorizontal: 12,
    marginVertical: 18,
  },
  listContainer: {
    marginTop: 20,
  },
  inner__container__text: {
    marginRight: 10,
    fontSize: 16,
  },
});
