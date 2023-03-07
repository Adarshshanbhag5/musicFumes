/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {StoragePermissionProvider} from './src/context/StoragePermissionContext';
import AppEntry from './src/AppEntry';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useAppThemeStore, {useDarkMode} from './src/zustand/store';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';

function App(): JSX.Element {
  const darkMode = useAppThemeStore(state => state.darkMode);
  return (
    <GestureHandlerRootView style={styles.container}>
      <StoragePermissionProvider>
        <StatusBar
          animated={true}
          backgroundColor={
            darkMode
              ? DarkTheme.colors.background
              : DefaultTheme.colors.background
          }
          barStyle={darkMode ? 'light-content' : 'dark-content'}
        />
        <AppEntry />
      </StoragePermissionProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
