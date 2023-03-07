import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';
import convertMsToTime from '../../utils/DurationFromater';
import globalStyle from '../../utils/GlobalStyle';
import {useFileSystemStore} from '../../zustand/FileSystemStore';
import {PlaylistStackScreenProps} from '../../types/navigation';
import {musicData} from '../../types/data';
import {useDarkMode} from '../../zustand/store';

type renderItemProps = {
  item: musicData;
  index: number;
};

const FavoritePlaylist = ({
  navigation,
}: PlaylistStackScreenProps<'favoritePlaylist'>) => {
  const [loading, setLoading] = useState(true);
  const [favoriteData, setFavoriteData] = useState<musicData[]>([]);
  const data = useFileSystemStore(state => state.mediaStoreData);
  const themeStyle = useDarkMode();
  const {favoriteList} = usePlaylistContext();
  function getFavoriteData() {
    try {
      setLoading(true);
      const songs = data!.filter(val => favoriteList.includes(val.id));
      setFavoriteData(songs);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (favoriteList) {
      getFavoriteData();
    }
  }, [favoriteList]);

  async function handlePress(startIndex: number) {
    let track = favoriteData;
    // console.log(startIndex);
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }

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

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={[globalStyle.flex__row__start, styles.innerContainer]}>
            <Text
              style={{
                ...styles.inner__container__text,
                color: themeStyle.color,
              }}>{`${favoriteData.length} songs`}</Text>
            <Text
              style={{
                ...styles.inner__container__text,
                color: themeStyle.color,
              }}>
              {favoriteData.length > 0
                ? convertMsToTime(
                    favoriteData.reduce(
                      (total, val) => val.duration + total,
                      0,
                    ),
                  )
                : '00:00:00'}
            </Text>
          </View>
          {favoriteData.length > 0 ? (
            <FlatList
              data={favoriteData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text style={{...styles.empty__text, color: themeStyle.color}}>
              Oops! favorite list is empty
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default FavoritePlaylist;

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
  empty__text: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
  },
});
