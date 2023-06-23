import React, {ReactNode, createContext, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {useAppStartUpStore} from '../zustand/appStartUpStore';
type Prop = {
  children: ReactNode;
};
interface PermissionType {
  // permissionGranted: boolean;
  // permissionLoading: boolean;
  getPermission?: () => Promise<void>;
  // getPermissionFirstTime?: () => void;
  // setPermissionGranted?: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultState = {
  getPermission: async () => {},
};
export const StoragePermissionContext =
  createContext<PermissionType>(defaultState);

export function StoragePermissionProvider({children}: Prop) {
  // const [permissionLoading, setPermissionLoading] = useState<boolean>(true);
  // const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

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
    } catch (err) {
      console.log(err);
    }
  }

  async function getPermissionFirstTime() {
    try {
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
        setPermissionLoading(false);
      } else {
        // console.log('storage permission denied');
        setPermissionGranted(false);
        setPermissionLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function checkPermission() {
    try {
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
      // console.log(granted);
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    // permissionGranted,
    // permissionLoading,
    getPermission,
    // getPermissionFirstTime,
    // setPermissionGranted,
  };
  return (
    <StoragePermissionContext.Provider value={value}>
      {children}
    </StoragePermissionContext.Provider>
  );
}
