import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {paletteType} from '../types/data';
import {NativeModules} from 'react-native';
const {RNGetAudioFiles} = NativeModules;

interface AppThemeStore {
  darkMode: boolean;
  accentColor: string;
  palette: paletteType;
  setDarkMode: (value: boolean) => void;
  setAccentColor: (value: string) => void;
  setPalette: (value: paletteType) => void;
}

type modeType = {
  bg: string;
  color: string;
  modalBg: string;
  pressedBg: string;
  seekBarBg: string;
};

const darkMode: modeType = {
  bg: '#000',
  color: '#fff',
  modalBg: '#212121',
  pressedBg: '#263238',
  seekBarBg: '#F2F3F4 ',
};

const lightMode: modeType = {
  bg: '#fff',
  color: '#000',
  modalBg: '#F5F5F5',
  pressedBg: '#E0E0E0',
  seekBarBg: '#515A5A',
};

const initialPalette = {
  darkVibrant: '#2A2929',
  lightVibrant: '#262526',
  darkMuted: '#444443',
  lightMuted: '#403E3F',
  rgb: '#0D0A0A',
  titleTextColor: '#F2F2F2',
  bodyTextColor: '#CBCEE2',
};

const useAppThemeStore = create<AppThemeStore>()(
  persist(
    set => ({
      darkMode: true,
      accentColor: '#65ffa0',
      palette: initialPalette,
      setAccentColor: value => set(() => ({accentColor: value})),
      setDarkMode: value => set(() => ({darkMode: value})),
      setPalette: value => set(() => ({palette: value})),
    }),
    {
      name: 'appThemeStore',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        darkMode: state.darkMode,
        accentColor: state.accentColor,
      }),
    },
  ),
);

export const useDarkMode = () => {
  // const [themeStyle, setThemeStyle] = useState<modeType>(darkMode);
  let themeStyle: modeType = darkMode;
  const dark = useAppThemeStore(state => state.darkMode);
  if (dark) {
    themeStyle = darkMode;
  } else {
    themeStyle = lightMode;
  }
  // useEffect(() => {
  //   if (dark) {
  //     setThemeStyle(darkMode);
  //   } else {
  //     setThemeStyle(lightMode);
  //   }
  // }, [dark]);
  return themeStyle;
};

export async function getColors(uri: string): Promise<paletteType> {
  const imgUri = uri.replace('file://', '');
  try {
    const res = await RNGetAudioFiles.getPalette(imgUri, initialPalette);
    return res;
  } catch (err: unknown) {
    console.log(err);
    return initialPalette;
  }
}

export default useAppThemeStore;
