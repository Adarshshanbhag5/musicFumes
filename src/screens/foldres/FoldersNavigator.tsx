import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Folders from './Folders';
import FolderInner from './FolderInner';
import {FoldersStackParamlist} from '../../types/navigation';

const Stack = createNativeStackNavigator<FoldersStackParamlist>();

const FoldersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="InternalStorage">
      <Stack.Screen
        name="InternalStorage"
        component={Folders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Music"
        component={FolderInner}
        options={({route}) => ({
          headerTitle: route.params.path.split('/').pop(),
        })}
      />
    </Stack.Navigator>
  );
};

export default FoldersNavigator;
