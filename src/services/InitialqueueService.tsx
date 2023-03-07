import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

const QUEUE_KEY = '@queue_key';
const LAST_TRACK = '@last_track';

async function InitialQueueService(): Promise<void> {
  try {
    const jsonValue = await AsyncStorage.getItem(QUEUE_KEY);
    const skipIndex = await AsyncStorage.getItem(LAST_TRACK);
    if (jsonValue != null) {
      const track = JSON.parse(jsonValue);
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      if (skipIndex != null) {
        await TrackPlayer.skip(parseInt(skipIndex, 10));
      }
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
    }
  } catch (err) {
    console.log(err);
  }
}

export default InitialQueueService;
