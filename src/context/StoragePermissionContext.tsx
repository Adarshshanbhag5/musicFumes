import React, {ReactNode, createContext, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {useAppStartUpStore} from '../zustand/appStartUpStore';
type Prop = {
  children: ReactNode;
};
interface PermissionType {
  getPermission: () => Promise<void>;
}
const defaultState = {
  getPermission: async () => {},
};
export const StoragePermissionContext =
  createContext<PermissionType>(defaultState);

export function StoragePermissionProvider({children}: Prop) {
  const setPermissionGranted = useAppStartUpStore(
    state => state.setPermissionGranted,
  );
  const setPermissionLoading = useAppStartUpStore(
    state => state.setPermissionLoading,
  );

  useEffect(() => {
    checkPermission();
  }, []);

  async function getPermission() {
    try {
      if (Platform.OS === 'android' && Platform.Version <= 32) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          // console.log('You can use the storage');
          setPermissionGranted(true);
          // setPermissionLoading(false);
        } else {
          // console.log('storage permission denied');
          setPermissionGranted(false);
          // setPermissionLoading(false);
        }
      } else {
        const readAudioFiles = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          {
            title: 'Musicfumes App read storage Permission',
            message:
              'To read audio files and its tags, To load AlbumArt cover photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (readAudioFiles === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function checkPermission() {
    try {
      if (Platform.OS === 'android' && Platform.Version <= 32) {
        const granted = await Promise.all([
          PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE'),
          PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE'),
        ]);
        if (granted[0] && granted[1]) {
          setPermissionGranted(true);
          setPermissionLoading(false);
        } else {
          setPermissionGranted(false);
          setPermissionLoading(false);
        }
      } else {
        const granted = await PermissionsAndroid.check(
          'android.permission.READ_MEDIA_AUDIO',
        );
        if (granted) {
          setPermissionGranted(true);
          setPermissionLoading(false);
        } else {
          setPermissionGranted(false);
          setPermissionLoading(false);
        }
      }
      // console.log(granted);
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    getPermission,
  };
  return (
    <StoragePermissionContext.Provider value={value}>
      {children}
    </StoragePermissionContext.Provider>
  );
}
