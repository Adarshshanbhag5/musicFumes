import {
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import globalStyle from '../../utils/GlobalStyle';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import useOnTogglePlayback from '../../hooks/useOnTogglePlayback';
import useAppThemeStore from '../../zustand/store';
const underlay = '#69a9cc';
const PlayerControlBottom = () => {
  const palette = useAppThemeStore(state => state.palette);
  const state = usePlaybackState();
  const isPlaying = state === State.Playing;
  const isLoading = useDebouncedValue(
    state === State.Connecting || state === State.Buffering,
    250,
  );

  const onTogglePlayback = useOnTogglePlayback();

  if (isLoading) {
    return (
      <View style={styles.statusContainer}>
        {isLoading && <ActivityIndicator />}
      </View>
    );
  }
  return (
    <View style={[globalStyle.flex__row__space, styles.container]}>
      <TouchableHighlight
        underlayColor={underlay}
        style={styles.touchAble}
        onPress={() => TrackPlayer.skipToPrevious()}>
        <MaterialIcons
          name="skip-previous"
          color={palette.titleTextColor}
          size={38}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={underlay}
        style={styles.touchAble}
        onPress={async () => {
          const position = (await TrackPlayer.getPosition()) - 10;
          TrackPlayer.seekTo(position);
        }}>
        <MaterialIcons
          name="fast-rewind"
          color={palette.titleTextColor}
          size={26}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={underlay}
        style={styles.touchAble}
        onPress={onTogglePlayback}>
        {isPlaying ? (
          <MaterialIcons
            name="pause"
            color={palette.titleTextColor}
            size={50}
          />
        ) : (
          <MaterialIcons
            name="play-arrow"
            color={palette.titleTextColor}
            size={50}
          />
        )}
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={underlay}
        style={styles.touchAble}
        onPress={async () => {
          const position = (await TrackPlayer.getPosition()) + 10;
          TrackPlayer.seekTo(position);
        }}>
        <MaterialIcons
          name="fast-forward"
          color={palette.titleTextColor}
          size={26}
        />
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={underlay}
        style={styles.touchAble}
        onPress={() => TrackPlayer.skipToNext()}>
        <MaterialIcons
          name="skip-next"
          color={palette.titleTextColor}
          size={38}
        />
      </TouchableHighlight>
    </View>
  );
};

export default PlayerControlBottom;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 35,
    marginVertical: 25,
  },
  touchAble: {
    borderRadius: 5,
    padding: 5,
  },
  statusContainer: {
    height: 40,
    width: 120,
    marginTop: 20,
    marginBottom: 60,
  },
});
