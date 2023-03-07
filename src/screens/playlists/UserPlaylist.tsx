import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';
import convertMsToTime from '../../utils/DurationFromater';
import globalStyle from '../../utils/GlobalStyle';
import {PlaylistStackScreenProps} from '../../types/navigation';
import {musicData} from '../../types/data';
import {useFileSystemStore} from '../../zustand/FileSystemStore';
import {useDarkMode} from '../../zustand/store';

type renderItemProps = {
  item: musicData;
  index: number;
};

const UserPlaylist = ({
  route,
  navigation,
}: PlaylistStackScreenProps<'userPlaylist'>) => {
  const [loading, setLoading] = useState(true);
  const [playlistData, setPlaylistData] = useState<musicData[]>([]);
  const data = useFileSystemStore(state => state.mediaStoreData);
  const themeStyle = useDarkMode();
  async function getPlaylistData() {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(route.params.data.key);
      if (jsonValue != null) {
        const playlist = JSON.parse(jsonValue);
        const songs: musicData[] = data!.filter(val =>
          playlist.includes(val.id),
        );
        setPlaylistData(songs);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handlePress(startIndex: number) {
    let track = playlistData;
    // console.log(startIndex);
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }
  useEffect(() => {
    getPlaylistData();
  }, []);

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
              }}>{`${playlistData.length} songs`}</Text>
            <Text
              style={{
                ...styles.inner__container__text,
                color: themeStyle.color,
              }}>
              {playlistData.length > 0
                ? convertMsToTime(
                    playlistData.reduce(
                      (total, val) => val.duration + total,
                      0,
                    ),
                  )
                : '00:00:00'}
            </Text>
          </View>
          {playlistData.length > 0 ? (
            <FlatList
              data={playlistData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text style={{...styles.empty__text, color: themeStyle.color}}>
              {' '}
              Oops! playlist is empty
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default UserPlaylist;

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
