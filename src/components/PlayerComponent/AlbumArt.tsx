import {StyleSheet, View} from 'react-native';
import React from 'react';
import {State, usePlaybackState} from 'react-native-track-player';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import useTransition from '../../hooks/animation/useTransition';

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

  return (
    <View style={styles.image__container}>
      <Animated.Image
        source={
          artwork
            ? {
                uri: artwork,
              }
            : require('../../assets/musicfumes_placeholder_dark.jpg')
        }
        style={[styles.albumArt, animatedStyle]}
      />
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
  albumArt: {
    width: '85%',
    height: 320,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowRadius: 10,
    borderRadius: 10,
  },
});
