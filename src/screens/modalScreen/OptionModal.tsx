import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModalWrap from '../../components/ModalWrap';
import OptionsView from '../../components/OptionsView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyle from '../../utils/GlobalStyle';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';
import TrackPlayer from 'react-native-track-player';
import {RootStackScreenProps} from '../../types/navigation';
import {useDarkMode} from '../../zustand/store';

const OptionModal = ({
  route,
  navigation,
}: RootStackScreenProps<'option_modal'>) => {
  const [heart, setHeart] = useState(false);
  const {favoriteList, setFavoriteSong} = usePlaylistContext();
  const themeStyle = useDarkMode();
  useEffect(() => {
    if (favoriteList) {
      favoriteList.includes(route.params.data.id)
        ? setHeart(true)
        : setHeart(false);
    }
  }, [favoriteList]);
  const removeFromCurrentQueue = async () => {
    const currQueue = await TrackPlayer.getQueue();
    let index = currQueue.findIndex(item => item.id === route.params.data.id);
    if (index > -1) {
      await TrackPlayer.remove(index);
      ToastAndroid.showWithGravity(
        'Done!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      ToastAndroid.showWithGravity(
        'Oops! this song is not in current queue',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    navigation.popToTop();
  };
  return (
    <ModalWrap navigation={navigation}>
      <View style={[globalStyle.flex__row__space, styles.header__container]}>
        <Text
          style={{...styles.header__text, color: themeStyle.color}}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {route.params.data.title}
        </Text>
        <MaterialIcons
          name={heart ? 'favorite' : 'favorite-border'}
          color={themeStyle.color}
          size={26}
          onPress={() => {
            setFavoriteSong?.(route.params.data.id);
          }}
        />
      </View>
      <View
        style={{
          ...styles.modal__inner__container,
          borderBottomWidth: 1,
          borderColor: '#555',
        }}>
        <OptionsView
          text="Song info"
          icon="info-outline"
          onPress={() => {
            navigation.replace('songInfo_modal', {data: route.params.data});
          }}
        />
        <OptionsView
          text="Remove from this queue"
          icon="remove-circle-outline"
          onPress={removeFromCurrentQueue}
        />
      </View>
      <View style={styles.modal__inner__container}>
        <OptionsView
          icon="skip-next"
          text="Play after current song"
          onPress={() => {}}
        />
        <OptionsView
          icon="queue-music"
          text="Add to a queue"
          onPress={() => {}}
        />
        <OptionsView
          icon="playlist-add"
          text="Add to playlists"
          onPress={() => {
            navigation.replace('addPlaylist_modal', {data: route.params.data});
          }}
        />
      </View>
    </ModalWrap>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  modal__inner__container: {
    marginTop: 10,
  },
  header__container: {
    marginHorizontal: 20,
  },
  header__text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
