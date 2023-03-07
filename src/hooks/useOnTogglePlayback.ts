import {useCallback} from 'react';
import TrackPlayer, {usePlaybackState, State} from 'react-native-track-player';
function useOnTogglePlayback() {
  const state = usePlaybackState();
  const isPlaying = state === State.Playing;

  return useCallback(() => {
    if (isPlaying) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }, [isPlaying]);
}

export default useOnTogglePlayback;
