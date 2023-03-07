import {ActivityIndicator, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {StoragePermissionContext} from './context/StoragePermissionContext';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import IntroNavigator from './appIntro/IntroNavigator';
import useGetOnboardingStatus from './hooks/useGetOnboardingStatus';
import StoragePermission from './components/StoragePermission';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootStackScreen from './screens/RootStackScreen';

const AppEntry = () => {
  const {permissionGranted, permissionLoading} = useContext(
    StoragePermissionContext,
  );
  const {isFirstLaunch, isFirstLaunchLoading} = useGetOnboardingStatus();

  if (isFirstLaunchLoading || permissionLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  } else if (permissionGranted === false && isFirstLaunch === true) {
    return (
      <NavigationContainer theme={DarkTheme}>
        <IntroNavigator />
      </NavigationContainer>
    );
  } else if (isFirstLaunch === false && permissionGranted === false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <StoragePermission withIntro={false} />
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

export default AppEntry;
