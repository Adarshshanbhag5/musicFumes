import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, {Event, State, Track} from 'react-native-track-player';
import AddQueueService from './AddQueueService';
import {setMostPlayedsongs} from '../zustand/AppDataStore';

let queue: Track[] = [];
let queueDragged = false;
let wasPausedByDuck = false;

let playbackCounter: number = 0;
let songPlayedFlag: boolean = false;

const LAST_TRACK = '@last_track';

export const setDragFalg = (flag = false, draggedQueue: Track[]) => {
  queueDragged = flag;
  queue = draggedQueue;
};

export default async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    console.log('Event.RemoteStop');
    TrackPlayer.reset();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    console.log('Event.RemoteJumpForward', event);
    const position = (await TrackPlayer.getPosition()) + event.interval;
    TrackPlayer.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    console.log('Event.RemoteJumpBackward', event);
    const position = (await TrackPlayer.getPosition()) - event.interval;
    TrackPlayer.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    console.log('Event.RemoteSeek', event);
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(
    Event.RemoteDuck,
    async ({permanent, paused}) => {
      console.log('Event.RemoteDuck');
      if (permanent) {
        TrackPlayer.pause();
        return;
      }
      if (paused) {
        const playerState = await TrackPlayer.getState();
        wasPausedByDuck = playerState !== State.Paused;
        TrackPlayer.pause();
      } else {
        if (wasPausedByDuck) {
          TrackPlayer.play();
          wasPausedByDuck = false;
        }
      }
    },
  );

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
    console.log('Event.PlaybackQueueEnded', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async event => {
    console.log('Event.PlaybackTrackChanged', event);
    // console.log(queueDragged);
    if (queueDragged) {
      // console.log(event.nextTrack);
      TrackPlayer.pause();
      queueDragged = false;
      AddQueueService(queue, event.nextTrack);
    }

    if (songPlayedFlag) {
      let track: Track | null;
      if (event.track != null) {
        track = await TrackPlayer.getTrack(event.track);
      } else {
        track = await TrackPlayer.getTrack(0);
      }
      if (track != null) {
        console.log('Added to mostPlayed', track.title);
        setMostPlayedsongs(track.id);
      }
    }
    playbackCounter = 0;
    songPlayedFlag = false;

    await AsyncStorage.setItem(LAST_TRACK, `${event.nextTrack}`);
  });

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, event => {
    console.log('Event.PlaybackProgressUpdated', event);
    playbackCounter += 2;
    if (Math.floor((playbackCounter / event.duration) * 100) >= 30) {
      songPlayedFlag = true;
    }
  });
}
