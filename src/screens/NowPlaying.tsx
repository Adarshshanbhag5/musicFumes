import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import AlbumArt from '../components/PlayerComponent/AlbumArt';
import AlbumDetail from '../components/PlayerComponent/AlbumDetail';
import Player from '../components/PlayerComponent/Player';
import useCurrentTrack from '../hooks/useCurrentTrack';

const NowPlaying = (): JSX.Element => {
  const track = useCurrentTrack();
  if (track) {
    return (
      <ImageBackground
        source={
          track.artwork
            ? {
                uri: track.artwork,
              }
            : require('../assets/musicfumes_placeholder_dark.jpg')
        }
        blurRadius={25}
        style={styles.ImageBackground}
        resizeMode="cover">
        <View style={styles.container}>
          <AlbumArt artwork={track.artwork} />
          <AlbumDetail
            title={track.title!}
            artist={track.artist!}
            album={track.album!}
          />
          <Player track={track} />
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <View style={styles.container}>
        <AlbumArt />
        <AlbumDetail
          title={'[No song in queue]'}
          artist={'[unknown]'}
          album={'[unknown]'}
        />
        <Player />
      </View>
    );
  }
};

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    zIndex: 10,
    backgroundColor: 'transparent',
    // opacity: 0.8
  },
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 5,
  },
});
