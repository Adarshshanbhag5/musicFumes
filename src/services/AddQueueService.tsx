import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, {RepeatMode, Track} from 'react-native-track-player';
import {musicTrack} from '../types/data';

const QUEUE_KEY = '@queue_key';

async function AddQueueService(
  queue: musicTrack[] | Track[],
  startIndex: number,
) {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(queue);
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
    if (startIndex) {
      await TrackPlayer.skip(startIndex);
    }
    TrackPlayer.play();
    const jsonValue = JSON.stringify(queue);
    await AsyncStorage.setItem(QUEUE_KEY, jsonValue);
  } catch (err) {
    console.log(err);
  }
}

export default AddQueueService;
