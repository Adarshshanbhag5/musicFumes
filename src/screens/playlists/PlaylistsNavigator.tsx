import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Playlists from './Playlists';
import AllSongs from './AllSongs';
import UserPlaylist from './UserPlaylist';
import FavoritePlaylist from './FavoritePlaylist';
import {PlaylistStackParamlist} from '../../types/navigation';
import MostPlayed from './MostPlayed';

const Stack = createNativeStackNavigator<PlaylistStackParamlist>();

const PlaylistsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="playlists">
      <Stack.Screen
        name="playlists"
        component={Playlists}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllSongs"
        component={AllSongs}
        options={{headerTitle: 'All songs'}}
      />
      <Stack.Screen
        name="userPlaylist"
        component={UserPlaylist}
        options={({route}) => ({headerTitle: route.params.data.name})}
      />
      <Stack.Screen
        name="favoritePlaylist"
        component={FavoritePlaylist}
        options={{headerTitle: 'Favorite songs'}}
      />
      <Stack.Screen
        name="mostPlayed"
        component={MostPlayed}
        options={{headerTitle: 'Most played songs'}}
      />
    </Stack.Navigator>
  );
};

export default PlaylistsNavigator;
