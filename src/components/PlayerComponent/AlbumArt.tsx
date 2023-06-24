import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {State, usePlaybackState} from 'react-native-track-player';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import useTransition from '../../hooks/animation/useTransition';
import useAppThemeStore from '../../zustand/store';

const mix = (value: number, x: number, y: number) => {
  'worklet';
  return x * (1 - value) + y * value;
};

const AlbumArt = ({artwork}: {artwork?: string | number}) => {
  const state = usePlaybackState();
  const isPlaying = state === State.Playing;
  const transition = useTransition(isPlaying);
  const animatedStyle = useAnimatedStyle(() => {
    const scale = mix(transition.value, 0.95, 1);
    return {
      transform: [{scale}],
    };
  });
  const palette = useAppThemeStore(state => state.palette);

  return (
    <View style={styles.image__container}>
      <Animated.View
        style={[
          styles.image__wrap,
          {
            backgroundColor: palette.rgb,
            shadowColor: palette.darkMuted,
          },
          animatedStyle,
        ]}>
        <Image
          source={
            artwork
              ? {
                  uri: artwork,
                }
              : require('../../assets/musicfumes_placeholder_dark.jpg')
          }
          style={styles.albumArt}
        />
      </Animated.View>
    </View>
  );
};

export default AlbumArt;

const styles = StyleSheet.create({
  image__container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 10,
  },
  image__wrap: {
    width: '85%',
    elevation: 10,
    shadowRadius: 10,
    borderRadius: 10,
  },
  albumArt: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 1,
  },
});
