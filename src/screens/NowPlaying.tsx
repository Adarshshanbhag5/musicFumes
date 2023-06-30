import {StyleSheet, Text, Vibration, View} from 'react-native';
import React, {useEffect} from 'react';
import AlbumArt from '../components/PlayerComponent/AlbumArt';
import AlbumDetail from '../components/PlayerComponent/AlbumDetail';
import Player from '../components/PlayerComponent/Player';
import useCurrentTrack from '../hooks/useCurrentTrack';
import useAppThemeStore, {getColors} from '../zustand/store';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {paletteType} from '../types/data';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';

const initialPalette = {
  darkVibrant: '#2A2929',
  lightVibrant: '#262526',
  darkMuted: '#444443',
  lightMuted: '#403E3F',
  rgb: '#0D0A0A',
  titleTextColor: '#F2F2F2',
  bodyTextColor: '#CBCEE2',
};

function swipeHandler(swipe: SharedValue<number>) {
  if (swipe.value > 100) {
    TrackPlayer.skipToPrevious();
    Vibration.vibrate(40);
  } else if (swipe.value < -100) {
    TrackPlayer.skipToNext();
    Vibration.vibrate(40);
  }
}

const NowPlaying = (): JSX.Element => {
  const track = useCurrentTrack();
  const [palette, setPalette] = useAppThemeStore(state => [
    state.palette,
    state.setPalette,
  ]);

  const swipe = useSharedValue(0);
  const pan = Gesture.Pan()
    .onChange(event => {
      if (event.translationY < 120 && event.translationY > -120) {
        swipe.value = event.translationY;
      }
    })
    .onFinalize(() => {
      runOnJS(swipeHandler)(swipe);
      swipe.value = withSpring(0);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: swipe.value}],
  }));

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
        <Text style={[{top: '5%', color: palette.bodyTextColor}, styles.text]}>
          Previous Song
        </Text>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.swipe__container,
              {backgroundColor: palette.rgb},
              animatedStyles,
            ]}>
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
          </Animated.View>
        </GestureDetector>

        <Text
          style={[{bottom: '5%', color: palette.bodyTextColor}, styles.text]}>
          Next Song
        </Text>
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
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  swipe__container: {
    flex: 1,
    zIndex: 10,
    justifyContent: 'space-between',
  },

  pan__view: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    // backgroundColor: '#abc546',
    zIndex: 10,
  },
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 5,
  },
  text: {
    position: 'absolute',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 16,
    zIndex: -10,
  },
});
