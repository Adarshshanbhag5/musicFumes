import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type playlistObjType = {
  name: string;
  key: string;
};

type mostPlayedSong = {
  songId: string;
  count: number;
};

interface AppDataState {
  playlist: playlistObjType[];
  favoriteList: string[];
  mostPlayedSongs: mostPlayedSong[];
}

interface AppDataActions {
  setPlaylist: (playlistObj: playlistObjType) => void;
  renamePlaylist: (index: number, input: string) => void;
  removePlaylist: (index: number) => void;
  setFavoriteList: (songId: string, exist: boolean) => void;
}

export const useAppDataStore = create<AppDataState & AppDataActions>()(
  persist(
    set => ({
      playlist: new Array<playlistObjType>(),
      favoriteList: new Array<string>(),
      mostPlayedSongs: new Array<mostPlayedSong>(),
      setPlaylist: playlistObj =>
        set(state => ({playlist: [...state.playlist, playlistObj]})),
      renamePlaylist: (index, input) =>
        set(state => ({
          playlist: state.playlist.map((list, i) =>
            i === index && input !== '' ? {...list, name: input} : list,
          ),
        })),
      removePlaylist: index =>
        set(state => ({
          playlist: state.playlist.filter((_, i) => i !== index),
        })),
      setFavoriteList: (songId, exist) =>
        set(state => ({
          favoriteList: exist
            ? state.favoriteList.filter(id => id !== songId)
            : [...state.favoriteList, songId],
        })),
    }),
    {
      name: 'appDataStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

//function for setting mostplayed song because we have to use it in playbackservice which is not a react component so hook not work

export function setMostPlayedsongs(songId: string) {
  let songExist = false;
  useAppDataStore.setState(state => {
    const updatedList = state.mostPlayedSongs.map(item => {
      if (item.songId === songId) {
        songExist = true;
        return {...item, count: item.count + 1};
      } else {
        return item;
      }
    });
    if (!songExist) {
      updatedList.push({songId, count: 1});
    }
    return {mostPlayedSongs: updatedList};
  });
}
