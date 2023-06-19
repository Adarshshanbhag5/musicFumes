import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllSongs} from '../zustand/FileSystemStore';
import TrackPlayer from 'react-native-track-player';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Queues from './Queues';
import NowPlaying from './NowPlaying';
import FoldersNavigator from './foldres/FoldersNavigator';
import Search from './Search';
import PlaylistsNavigator from './playlists/PlaylistsNavigator';
import MoreOptions from './moreOptions/MoreOptions';
import SetupService from '../services/SetupService';
import InitialQueueService from '../services/InitialqueueService';
import {MusicFumesParamlist} from '../types/navigation';
import useHydration from '../hooks/useHydration';
import SplashScreen from './SplashScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import useAppThemeStore from '../zustand/store';

const Tab = createMaterialTopTabNavigator<MusicFumesParamlist>();

const MusicFumes = () => {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [timePassed, setTimePassed] = useState<boolean>(false);
  const hydrated = useHydration();
  const accentColor = useAppThemeStore(state => state.accentColor);

  useEffect(() => {
    async function setUpPlayer() {
      try {
        const isSetup = await SetupService();
        setIsPlayerReady(isSetup);
        // const Queue = await TrackPlayer.getQueue();
        // await getAllSongs();
        const response = await Promise.all([
          TrackPlayer.getQueue(),
          getAllSongs(),
        ]);
        if (isSetup && response[0].length <= 0) {
          await InitialQueueService();
        }
      } catch (err) {
        console.log(err);
      }
    }
    setUpPlayer();
    setTimeout(() => setTimePassed(true), 2000);
  }, []);

  if (!isPlayerReady || !hydrated || !timePassed) {
    return (
      <SafeAreaView style={{flex: 1}}>
        <SplashScreen />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <Tab.Navigator
          tabBarPosition="bottom"
          initialRouteName="NowPlaying"
          screenOptions={{
            // tabBarStyle: {backgroundColor: '#111'},
            tabBarIndicatorStyle: {backgroundColor: accentColor},
            tabBarShowLabel: false,
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
                <MaterialIcons
                  name="play-circle-fill"
                  color={color}
                  size={26}
                />
              ),
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
  }
};

export default MusicFumes;
