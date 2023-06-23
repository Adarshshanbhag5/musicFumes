import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {AlbumStackScreenProps} from '../../types/navigation';
import globalStyle from '../../utils/GlobalStyle';
import {useDarkMode} from '../../zustand/store';
import convertMsToTime from '../../utils/DurationFromater';
import {musicTrack} from '../../types/data';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';

const ITEM_HEIGHT = 90;

type renderItemProps = {
  item: musicTrack;
  index: number;
};

const AlbumList = ({navigation, route}: AlbumStackScreenProps<'albumList'>) => {
  const themeStyle = useDarkMode();
  async function handlePress(startIndex: number) {
    let track = route.params.data;
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
      <View style={[globalStyle.flex__row__start, styles.details__container]}>
        <Text
          style={{
            marginRight: 10,
            color: themeStyle.color,
          }}>{`${route.params.data.length} songs`}</Text>
        <Text
          style={{
            marginRight: 10,
            color: themeStyle.color,
          }}>{`${convertMsToTime(
          route.params.data.reduce((total, val) => val.duration + total, 0),
        )}`}</Text>
      </View>
      {route.params.data && (
        <FlatList
          data={route.params.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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

export default AlbumList;

const styles = StyleSheet.create({
  header__container: {
    paddingHorizontal: 12,
    marginVertical: 18,
  },

  details__container: {
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
