import {useEffect, useState} from 'react';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';

export default function useCurrentQueue() {
  const [trackIndex, setTrackIndex] = useState<number | undefined>();
  const [queue, setQueue] = useState<Track[] | undefined>([]);
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async ({nextTrack}) => {
    setTrackIndex(nextTrack);
  });
  useEffect(() => {
    if (trackIndex === undefined) return;
    (async () => {
      const currentQueue = await TrackPlayer.getQueue();
      setQueue(currentQueue);
    })();
  }, [trackIndex]);

  return {queue, trackIndex};
}
