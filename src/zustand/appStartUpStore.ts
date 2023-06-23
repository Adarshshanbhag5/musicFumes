import {create} from 'zustand';

interface appStartUpState {
  permissionGranted: boolean;
  permissionLoading: boolean;
  isFirstLaunch: boolean;
  isFirstLaunchLoading: boolean;
}

interface appStartUpAction {
  setPermissionGranted: (value: boolean) => void;
  setPermissionLoading: (value: boolean) => void;
  setIsFirstLaunch: (value: boolean) => void;
  setIsFirstLaunchLoading: (value: boolean) => void;
}

export const useAppStartUpStore = create<appStartUpState & appStartUpAction>()(
  set => ({
    permissionGranted: false,
    permissionLoading: true,
    isFirstLaunch: false,
    isFirstLaunchLoading: true,
    setPermissionGranted: value => set(() => ({permissionGranted: value})),
    setPermissionLoading: value => set(() => ({permissionLoading: value})),
    setIsFirstLaunch: value => set(() => ({isFirstLaunch: value})),
    setIsFirstLaunchLoading: value =>
      set(() => ({isFirstLaunchLoading: value})),
  }),
);
