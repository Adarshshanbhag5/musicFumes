import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';
import convertMsToTime from '../../utils/DurationFromater';
import globalStyle from '../../utils/GlobalStyle';
import {useFileSystemStore} from '../../zustand/FileSystemStore';
import {PlaylistStackScreenProps} from '../../types/navigation';
import {musicData} from '../../types/data';
import {useDarkMode} from '../../zustand/store';
import {useAppDataStore} from '../../zustand/AppDataStore';

type renderItemProps = {
  item: musicData;
  index: number;
};

const MostPlayed = ({navigation}: PlaylistStackScreenProps<'mostPlayed'>) => {
  const [loading, setLoading] = useState(true);
  const [mostPlayedData, setMostPlayedData] = useState<musicData[]>([]);
  const data = useFileSystemStore(state => state.mediaStoreData);
  const themeStyle = useDarkMode();
  const mostPlayedSongs = useAppDataStore(state => state.mostPlayedSongs);

  useEffect(() => {
    function getMostPlayedData() {
      try {
        setLoading(true);
        const songs = data!.filter(val =>
          mostPlayedSongs.some(song => song.songId === val.id),
        );
        setMostPlayedData(songs);
      } finally {
        setLoading(false);
      }
    }

    if (mostPlayedSongs) {
      getMostPlayedData();
    }
  }, [mostPlayedSongs]);

  async function handlePress(startIndex: number) {
    let track = mostPlayedData;
    // console.log(startIndex);
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }

  const renderItem = useCallback(
    ({item, index}: renderItemProps) => (
      <View>
        <Text style={styles.countText}>
          Play count:{mostPlayedSongs[index].count}
        </Text>
        <SongListView
          data={item}
          onPress={() => {
            handlePress(index);
          }}
        />
      </View>
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
              }}>{`${mostPlayedData.length} songs`}</Text>
            <Text
              style={{
                ...styles.inner__container__text,
                color: themeStyle.color,
              }}>
              {mostPlayedData.length > 0
                ? convertMsToTime(
                    mostPlayedData.reduce(
                      (total, val) => val.duration + total,
                      0,
                    ),
                  )
                : '00:00:00'}
            </Text>
          </View>
          {mostPlayedData.length > 0 ? (
            <FlatList
              data={mostPlayedData}
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

export default MostPlayed;

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
  countText: {
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 16,
  },
});
