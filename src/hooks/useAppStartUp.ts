import {useEffect, useState} from 'react';
import useHydration from './useHydration';
import SetupService from '../services/SetupService';
import TrackPlayer from 'react-native-track-player';
import {getAllSongs} from '../zustand/FileSystemStore';
import InitialQueueService from '../services/InitialqueueService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppStartUpStore} from '../zustand/appStartUpStore';

type returnType = {
  isPlayerReady: boolean;
  hydrated: boolean;
  timePassed: boolean;
};

const USER_ONBOARDED = '@user_onboarded';

async function checkFirstLaunch() {
  try {
    const isFirstLaunch = await AsyncStorage.getItem(USER_ONBOARDED);
    if (isFirstLaunch === null) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export default function useAppstartUp(): returnType {
  const permissionGranted = useAppStartUpStore(
    state => state.permissionGranted,
  );
  const setFirstLaunchLoading = useAppStartUpStore(
    state => state.setIsFirstLaunchLoading,
  );
  const [isFirstLaunch, setIsFirstLaunch] = useAppStartUpStore(state => [
    state.isFirstLaunch,
    state.setIsFirstLaunch,
  ]);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState<boolean>(false);
  const hydrated = useHydration();

  useEffect(() => {
    (async () => {
      try {
        const FirstLaunch = await checkFirstLaunch();
        if (FirstLaunch) {
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setFirstLaunchLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    async function setUpPlayer() {
      try {
        const isSetup = await SetupService();
        const response = await Promise.all([
          TrackPlayer.getQueue(),
          getAllSongs(),
        ]);
        if (isSetup && response[0].length <= 0) {
          await InitialQueueService();
        }
        setIsPlayerReady(isSetup);
      } catch (err) {
        console.log(err);
      }
    }
    if (permissionGranted && !isFirstLaunch) {
      setUpPlayer();
    }
    setTimeout(() => setTimePassed(true), 2000);
  }, [permissionGranted, isFirstLaunch]);

  return {
    isPlayerReady,
    hydrated,
    timePassed,
  };
}
