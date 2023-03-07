import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
interface AppThemeStore {
  darkMode: boolean;
  accentColor: string;
  setDarkMode: (value: boolean) => void;
  setAccentColor: (value: string) => void;
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
const useAppThemeStore = create<AppThemeStore>()(
  persist(
    set => ({
      darkMode: true,
      accentColor: '#65ffa0',
      setAccentColor: value => set(() => ({accentColor: value})),
      setDarkMode: value => set(() => ({darkMode: value})),
    }),
    {
      name: 'appThemeStore',
      storage: createJSONStorage(() => AsyncStorage),
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

export default useAppThemeStore;
