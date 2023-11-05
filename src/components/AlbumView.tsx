import {StyleSheet} from 'react-native';
import React from 'react';
import {musicTrack} from '../types/data';
import {List} from 'react-native-paper';

type AlbumViewType = {
  name: string;
  album: musicTrack[];
  onPress: () => void;
};

const AlbumView = ({name, album, onPress}: AlbumViewType) => {
  return (
    <List.Item
      onPress={onPress}
      title={name}
      titleStyle={styles.album__title}
      description={`Tracks ${album.length}`}
      left={props => (
        <List.Image
          style={[props.style, styles.image]}
          source={
            album[0].artwork
              ? {uri: album[0].artwork}
              : require('../assets/musicfumes_placeholder_dark.png')
          }
        />
      )}
    />
  );
};

export default AlbumView;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    aspectRatio: 1 / 1,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  album__title: {
    fontWeight: 'bold',
  },
});
