import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Queues from './Queues';
import NowPlaying from './NowPlaying';
import FoldersNavigator from './foldres/FoldersNavigator';
import Search from './Search';
import PlaylistsNavigator from './playlists/PlaylistsNavigator';
import MoreOptions from './moreOptions/MoreOptions';
import {MusicFumesParamlist} from '../types/navigation';
import useAppThemeStore from '../zustand/store';
import AlbumsNavigator from './albums/AlbumsNavigator';

const Tab = createMaterialTopTabNavigator<MusicFumesParamlist>();

const MusicFumes = () => {
  const accentColor = useAppThemeStore(state => state.accentColor);
  const palette = useAppThemeStore(state => state.palette);

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName="NowPlaying"
        screenOptions={{
          tabBarIndicatorStyle: {backgroundColor: accentColor},
          tabBarShowLabel: false,
          tabBarBounces: true,
        }}>
        <Tab.Screen
          name="Queue"
          component={Queues}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="queue-music" color={color} size={26} />
            ),
            lazy: true,
            lazyPlaceholder: () => <ActivityIndicator />,
          }}
        />
        <Tab.Screen
          name="NowPlaying"
          component={NowPlaying}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="play-circle-fill" color={color} size={26} />
            ),
            tabBarStyle: {
              backgroundColor: palette.rgb,
              borderColor: palette.titleTextColor,
              borderTopWidth: 1,
            },
            tabBarActiveTintColor: palette.titleTextColor,
            tabBarIndicatorStyle: {backgroundColor: palette.titleTextColor},
          }}
        />
        <Tab.Screen
          name="FoldersNavigator"
          component={FoldersNavigator}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="folder" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="AlbumsNavigator"
          component={AlbumsNavigator}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="album" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="search" color={color} size={26} />
            ),
            lazy: true,
            lazyPlaceholder: () => <ActivityIndicator />,
          }}
        />
        <Tab.Screen
          name="PlaylistsNavigator"
          component={PlaylistsNavigator}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialIcons name="library-music" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="MoreOptions"
          component={MoreOptions}
          options={{
            swipeEnabled: false,
            tabBarIcon: ({color}) => (
              <MaterialIcons name="more" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MusicFumes;
