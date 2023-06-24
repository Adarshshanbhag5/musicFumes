import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle from '../../utils/GlobalStyle';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import useAppThemeStore from '../../zustand/store';

const PlayerSeekbar = () => {
  const progress = useProgress();
  const palette = useAppThemeStore(state => state.palette);
  return (
    <View
      style={[globalStyle.flex__row__space, styles.playerSeekbar__container]}>
      <Text style={{...styles.duration__text, color: palette.titleTextColor}}>
        {new Date(progress.position * 1000).toISOString().slice(14, 19)}
      </Text>
      <Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        onSlidingComplete={TrackPlayer.seekTo}
        minimumTrackTintColor={palette.titleTextColor}
        maximumTrackTintColor={palette.darkVibrant}
        thumbTintColor={palette.titleTextColor}
        style={styles.seekBar}
      />
      <Text style={{...styles.duration__text, color: palette.titleTextColor}}>
        {new Date((progress.duration - progress.position) * 1000)
          .toISOString()
          .slice(14, 19)}
      </Text>
    </View>
  );
};

export default PlayerSeekbar;

const styles = StyleSheet.create({
  playerSeekbar__container: {
    marginTop: 30,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  seekBar: {
    width: '80%',
    marginHorizontal: 3,
  },
  duration__text: {
    marginHorizontal: 0,
    color: '#fff',
  },
});
