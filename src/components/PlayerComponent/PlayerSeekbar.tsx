import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle from '../../utils/GlobalStyle';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import useAppThemeStore from '../../zustand/store';
import {Slider} from '@miblanchard/react-native-slider';

const formatSeconds = (time: number) =>
  new Date(time * 1000).toISOString().slice(14, 19);

const PlayerSeekbar = () => {
  const progress = useProgress();
  const palette = useAppThemeStore(state => state.palette);
  return (
    <View
      style={[globalStyle.flex__row__space, styles.playerSeekbar__container]}>
      <Text style={{...styles.duration__text, color: palette.titleTextColor}}>
        {formatSeconds(progress.position)}
      </Text>
      <Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        onSlidingComplete={value => {
          TrackPlayer.seekTo(value[0]);
        }}
        minimumTrackTintColor={palette.bodyTextColor}
        maximumTrackTintColor={palette.darkMuted}
        thumbTintColor={palette.titleTextColor}
        containerStyle={styles.seekBar}
      />
      <Text style={{...styles.duration__text, color: palette.titleTextColor}}>
        {formatSeconds(Math.max(0, progress.duration - progress.position))}
      </Text>
    </View>
  );
};

export default PlayerSeekbar;

const styles = StyleSheet.create({
  playerSeekbar__container: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  seekBar: {
    width: '75%',
    alignSelf: 'center',
    marginHorizontal: 3,
  },
  duration__text: {
    marginHorizontal: 0,
    color: '#fff',
  },
});
