import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AlbumStackParamlist} from '../../types/navigation';
import Albums from './Albums';
import AlbumList from './AlbumList';

const Stack = createNativeStackNavigator<AlbumStackParamlist>();

export default function AlbumsNavigator() {
  return (
    <Stack.Navigator initialRouteName="albums">
      <Stack.Screen
        name="albums"
        component={Albums}
        options={{headerShown: false}}
      />
      <Stack.Screen name="albumList" component={AlbumList} />
    </Stack.Navigator>
  );
}
