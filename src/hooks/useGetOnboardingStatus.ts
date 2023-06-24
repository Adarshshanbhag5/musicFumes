import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {useAppStartUpStore} from '../zustand/appStartUpStore';

const USER_ONBOARDED = '@user_onboarded';

async function checkFirstLaunch() {
  try {
    const isFirstLaunch = await AsyncStorage.getItem(USER_ONBOARDED);
    if (isFirstLaunch === null) {
      //   AsyncStorage.setItem(USER_ONBOARDED, 'true');
      //   console.log('firstEntry === true');
      return true;
    }
    // console.log('firstEntry === false');
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function useGetOnboardingStatus() {
  const setFirstLaunchLoading = useAppStartUpStore(
    state => state.setIsFirstLaunchLoading,
  );
  const setIsFirstLaunch = useAppStartUpStore(state => state.setIsFirstLaunch);

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
}

export default useGetOnboardingStatus;
