import {StyleSheet, View} from 'react-native';
import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import IntroNavigator from './appIntro/IntroNavigator';
import StoragePermission from './components/StoragePermission';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import RootStackScreen from './screens/RootStackScreen';
import useAppstartUp from './hooks/useAppStartUp';
import SplashScreen from './screens/SplashScreen';
import {useAppStartUpStore} from './zustand/appStartUpStore';

const AppEntry = () => {
  const isFirstLaunch = useAppStartUpStore(state => state.isFirstLaunch);
  const isFirstLaunchLoading = useAppStartUpStore(
    state => state.isFirstLaunchLoading,
  );
  const permissionLoading = useAppStartUpStore(
    state => state.permissionLoading,
  );
  const permissionGranted = useAppStartUpStore(
    state => state.permissionGranted,
  );
  const {isPlayerReady, hydrated, timePassed} = useAppstartUp();

  if (
    (isFirstLaunchLoading || permissionLoading || !hydrated || !timePassed) &&
    !isPlayerReady
  ) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <SplashScreen />
      </SafeAreaView>
    );
  } else if (isFirstLaunch) {
    return (
      <NavigationContainer theme={DarkTheme}>
        <IntroNavigator />
      </NavigationContainer>
    );
  } else if (!isFirstLaunch && !permissionGranted) {
    return (
      <View style={styles.permission__wrap}>
        <StoragePermission />
      </View>
    );
  } else {
    return (
      <SafeAreaProvider>
        <RootStackScreen />
      </SafeAreaProvider>
    );
  }
};

const styles = StyleSheet.create({
  permission__wrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default AppEntry;
