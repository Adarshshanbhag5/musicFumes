import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import AlbumArt from '../components/PlayerComponent/AlbumArt';
import AlbumDetail from '../components/PlayerComponent/AlbumDetail';
import Player from '../components/PlayerComponent/Player';
import useCurrentTrack from '../hooks/useCurrentTrack';
import useAppThemeStore, {getColors} from '../zustand/store';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {paletteType} from '../types/data';

const initialPalette = {
  darkVibrant: '#2A2929',
  lightVibrant: '#262526',
  darkMuted: '#444443',
  lightMuted: '#403E3F',
  rgb: '#0D0A0A',
  titleTextColor: '#F2F2F2',
  bodyTextColor: '#CBCEE2',
};

const NowPlaying = (): JSX.Element => {
  const track = useCurrentTrack();
  const [palette, setPalette] = useAppThemeStore(state => [
    state.palette,
    state.setPalette,
  ]);

  useEffect(() => {
    (async () => {
      if (track?.artwork && typeof track?.artwork === 'string') {
        const uri: string = track.artwork;
        try {
          const palette: paletteType = await getColors(uri);
          setPalette(palette);
        } catch (err) {
          console.log(err);
        }
      } else {
        setPalette(initialPalette);
      }
    })();
  }, [track]);

  if (track) {
    return (
      <View style={[styles.container, {backgroundColor: palette.rgb}]}>
        <FocusAwareStatusBar
          statusBarprops={{
            animated: true,
            backgroundColor: palette.rgb,
            translucent: true,
          }}
          hexColor={palette.rgb}
        />
        <AlbumArt artwork={track.artwork} />
        <AlbumDetail
          color={palette.titleTextColor}
          title={track.title!}
          artist={track.artist!}
          album={track.album!}
        />
        <Player track={track} />
      </View>
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
  },
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 5,
  },
});
