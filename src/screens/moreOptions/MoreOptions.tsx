import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HelpInfo from './HelpInfo';
import SleepTimer from './SleepTimer';
import MoreOptionsInner from './MoreOptionsInner';
import {MoreOptionsStackParamlist} from '../../types/navigation';

const Stack = createNativeStackNavigator<MoreOptionsStackParamlist>();

const MoreOptions = () => {
  return (
    <Stack.Navigator
      initialRouteName="more"
      screenOptions={{animation: 'fade_from_bottom'}}>
      <Stack.Screen
        name="more"
        component={MoreOptionsInner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Help_and_info"
        component={HelpInfo}
        options={{headerShown: true}}
      />
      <Stack.Screen name="sleep_timer" component={SleepTimer} />
    </Stack.Navigator>
  );
};

export default MoreOptions;
