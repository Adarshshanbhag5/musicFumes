import React from 'react';
// import {FileSystemProvider} from '../hooks/useFileSystem';
import {PlaylistProvider} from '../hooks/usePlaylistContext';
import MusicFumes from './MusicFumes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import InputModal from './modalScreen/InputModal';
import PlaylistLongPressModal from './modalScreen/PlaylistLongPressModal';
import OptionModal from './modalScreen/OptionModal';
import AddPlaylistModal from './modalScreen/AddPlaylistModal';
import ColorPaletteModal from './modalScreen/ColorPaletteModal';
import SongInfoModal from './modalScreen/SongInfoModal';
import useAppThemeStore from '../zustand/store';
import {RootStackParamlist} from '../types/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';

const RootStack = createNativeStackNavigator<RootStackParamlist>();
const RootStackScreen = () => {
  const darkTheme = useAppThemeStore(state => state.darkMode);
  return (
    // <View style={{flex: 1}}>
    <SafeAreaView style={{flex: 1}}>
      {/* <FileSystemProvider> */}
      <PlaylistProvider>
        <NavigationContainer theme={darkTheme ? DarkTheme : DefaultTheme}>
          <RootStack.Navigator
            initialRouteName="musicFumes"
            screenOptions={{headerShown: false}}>
            <RootStack.Group>
              <RootStack.Screen name="musicFumes" component={MusicFumes} />
            </RootStack.Group>
            <RootStack.Group
              screenOptions={{
                presentation: 'transparentModal',
                headerShown: false,
              }}>
              <RootStack.Screen name="input_text" component={InputModal} />
              <RootStack.Screen
                name="playlistlongpress"
                component={PlaylistLongPressModal}
              />
              <RootStack.Screen name="option_modal" component={OptionModal} />
              <RootStack.Screen
                name="addPlaylist_modal"
                component={AddPlaylistModal}
              />
              <RootStack.Screen
                name="Colorpalettemodal"
                component={ColorPaletteModal}
              />
              <RootStack.Screen
                name="songInfo_modal"
                component={SongInfoModal}
              />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </PlaylistProvider>
      {/* </FileSystemProvider> */}
    </SafeAreaView>
    // </View>
  );
};

export default RootStackScreen;
