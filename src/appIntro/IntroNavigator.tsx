import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from './IntroScreen';
import {IntroStackParamlist} from '../types/navigation';
import StoragePermissionScreen from './StoragePermissionScreen';
import UserPreferencesScreen from './UserPreferencesScreen';
import ColorPaletteModal from '../screens/modalScreen/ColorPaletteModal';

const Stack = createNativeStackNavigator<IntroStackParamlist>();
const IntroNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Permission" component={StoragePermissionScreen} />
      <Stack.Screen name="Preferences" component={UserPreferencesScreen} />
      <Stack.Screen
        name="Colorpalettemodal"
        component={ColorPaletteModal}
        options={{presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
};

export default IntroNavigator;
