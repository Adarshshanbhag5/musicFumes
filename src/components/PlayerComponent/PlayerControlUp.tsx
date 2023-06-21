import {StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
import globalStyle from '../../utils/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {Track} from 'react-native-track-player';
import {useDarkMode} from '../../zustand/store';
import {useAppDataStore} from '../../zustand/AppDataStore';

const PlayerControlUp = ({track}: {track?: Track}) => {
  const navigation = useNavigation<any>();
  const favoriteList = useAppDataStore(state => state.favoriteList);
  const setFavoriteSong = useAppDataStore(state => state.setFavoriteList);
  const [heart, setHeart] = useState(false);
  const themeStyle = useDarkMode();
  const addPlaylist = () => {
    if (track) {
      navigation.navigate('addPlaylist_modal', {data: track});
    }
  };
  const optionPress = () => {
    if (track) {
      navigation.navigate('option_modal', {data: track});
    }
  };
  const infoPress = () => {
    if (track) {
      navigation.navigate('songInfo_modal', {data: track});
    }
  };
  useEffect(() => {
    if (favoriteList && track) {
      favoriteList.includes(track.id) ? setHeart(true) : setHeart(false);
    }
  }, [track, favoriteList]);
  return (
    <View style={[globalStyle.flex__row__space, styles.container]}>
      <View style={[globalStyle.flex__row__space, styles.left__container]}>
        <MaterialIcons
          name={heart ? 'favorite' : 'favorite-border'}
          color={themeStyle.color}
          size={24}
          style={styles.icon}
          onPress={() => {
            if (track) {
              setFavoriteSong(track.id, heart);
            }
          }}
        />
        <MaterialIcons
          name="info-outline"
          color={themeStyle.color}
          size={24}
          style={styles.icon}
          onPress={infoPress}
        />
        <MaterialIcons
          name="playlist-add"
          color={themeStyle.color}
          size={24}
          style={styles.icon}
          onPress={addPlaylist}
        />
        <MaterialIcons
          name="more-horiz"
          color={themeStyle.bg}
          size={22}
          style={{
            backgroundColor: themeStyle.color,
            borderRadius: 8,
          }}
          onPress={optionPress}
        />
      </View>
      <View style={globalStyle.flex__row__space}>
        <MaterialCommunityIcons
          name="shuffle"
          color={themeStyle.color}
          size={24}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default PlayerControlUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  left__container: {
    width: '55%',
  },
  icon: {
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
