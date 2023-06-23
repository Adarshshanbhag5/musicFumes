import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

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
  const [isFirstLaunch, setFirstLaunch] = useState(false);
  const [isFirstLaunchLoading, setFirstLaunchLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const FirstLaunch = await checkFirstLaunch();
        if (FirstLaunch) {
          setFirstLaunch(true);
        } else {
          setFirstLaunch(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setFirstLaunchLoading(false);
      }
    })();
  }, []);
  return {isFirstLaunch, isFirstLaunchLoading, setFirstLaunch};
}

export default useGetOnboardingStatus;
