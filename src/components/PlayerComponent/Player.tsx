import {View} from 'react-native';
import React from 'react';
import PlayerControlUp from './PlayerControlUp';
import PlayerControlBottom from './PlayerControlBottom';
import PlayerSeekbar from './PlayerSeekbar';
import {Track} from 'react-native-track-player';

const Player = ({track}: {track?: Track}) => {
  return (
    <View>
      <PlayerControlUp track={track} />
      <PlayerSeekbar />
      <PlayerControlBottom />
    </View>
  );
};

export default Player;
