import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {musicTrack} from '../types/data';
import globalStyle from '../utils/GlobalStyle';
// import { useNavigation } from '@react-navigation/native';
// import {AlbumStackScreenProps} from '../types/navigation';

type AlbumViewType = {
  name: string;
  album: musicTrack[];
  onPress: () => void;
};

const AlbumView = ({name, album, onPress}: AlbumViewType) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        foreground: true,
        color: 'rgba(255,255,255,0.2)',
      }}>
      <View style={[globalStyle.flex__row__start, styles.container]}>
        <Image
          source={
            album[0].artwork
              ? {uri: album[0].artwork}
              : require('../assets/musicfumes_placeholder_dark.jpg')
          }
          style={styles.image}
        />
        <View style={styles.text__container}>
          <Text
            style={styles.album__text}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {name}
          </Text>
          <Text>Tracks {album.length}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AlbumView;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 18,
    borderRadius: 5,
  },
  text__container: {
    marginHorizontal: 10,
    flex: 1,
    paddingVertical: 2,
  },
  image: {
    resizeMode: 'cover',
    aspectRatio: 1 / 1,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  album__text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
});
