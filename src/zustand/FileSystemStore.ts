import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {musicData, musicTrack} from '../types/data';
import {NativeModules, Platform} from 'react-native';
const {RNGetAudioFiles} = NativeModules;

interface FileSystemStore {
  mediaStoreData: musicTrack[];
  folders: [string, musicTrack[]][];
  albums: [string, musicTrack[]][];
}

type groupType = {
  folderArray: {[key1: string]: musicTrack[]};
  albumArray: {[key1: string]: musicTrack[]};
  musicTrack: musicTrack[];
};

type groupMediaStoreDataReturnType = {
  albumArray: [string, musicTrack[]][];
  folderArray: [string, musicTrack[]][];
  musicTrackArray: musicTrack[];
};

export const useFileSystemStore = create<FileSystemStore>()(
  persist(
    _ => ({
      mediaStoreData: new Array<musicTrack>(),
      folders: new Array<[string, musicTrack[]]>(),
      albums: new Array<[string, musicTrack[]]>(),
    }),
    {
      name: 'fileSystem',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({mediaStoreData: state.mediaStoreData}),
    },
  ),
);

function getSongs() {
  return new Promise<musicData[]>((resolve, reject) => {
    if (Platform.OS === 'android') {
      RNGetAudioFiles.getSong(
        (songs: musicData[]) => {
          resolve(songs);
        },
        (error: any) => {
          reject(error);
        },
      );
    }
  });
}

function groupMediaStoreData(data: musicData[]): groupMediaStoreDataReturnType {
  const groupedData: groupType = data.reduce<groupType>(
    (
      group,
      {
        album,
        artist,
        artwork,
        contentType,
        directory,
        duration,
        id,
        title,
        url,
      },
    ) => {
      const track: musicTrack = {
        album,
        artist,
        artwork,
        contentType,
        duration,
        id,
        title,
        url,
      };
      if (!group.folderArray[directory]) {
        group.folderArray[directory] = [];
      }
      group.folderArray[directory].push(track);
      if (!group.albumArray[album]) {
        group.albumArray[album] = [];
      }
      group.albumArray[album].push(track);

      group.musicTrack.push(track);
      return group;
    },
    {folderArray: {}, albumArray: {}, musicTrack: []} as groupType,
  );

  const albumArray: [string, musicTrack[]][] = Object.entries(
    groupedData.albumArray,
  );
  const folderArray: [string, musicTrack[]][] = Object.entries(
    groupedData.folderArray,
  );

  const musicTrackArray: musicTrack[] = groupedData.musicTrack;

  return {albumArray, folderArray, musicTrackArray};
}

export async function getAllSongs() {
  try {
    const res = await getSongs();
    if (res) {
      const {albumArray, folderArray, musicTrackArray} =
        groupMediaStoreData(res);
      useFileSystemStore.setState(() => ({
        mediaStoreData: musicTrackArray,
        folders: folderArray,
        albums: albumArray,
      }));
    }
  } catch (err) {
    console.log(err);
  }
}
