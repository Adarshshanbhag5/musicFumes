import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import storageKeys from '../utils/StorageKeys';

type playlistObjType = {
  name: string;
  key: string;
};

type playlistContextType = {
  favoriteList: string[];
  playlist: playlistObjType[];
  setPlaylist?: React.Dispatch<React.SetStateAction<playlistObjType[]>>;
  createPlaylist?: (playlistObj: playlistObjType) => Promise<void>;
  renamePlaylist?: (index: number, input: string) => Promise<void>;
  setFavoriteSong?: (songId: string) => Promise<void>;
};

const defaultValue = {
  favoriteList: [],
  playlist: [],
};

const PlaylistContext = createContext<playlistContextType>(defaultValue);
export const usePlaylistContext = () => useContext(PlaylistContext);
export const PlaylistProvider = ({children}: {children: ReactNode}) => {
  const [playlist, setPlaylist] = useState<playlistObjType[]>([]);
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  async function getPlaylist() {
    const res = await Promise.all([
      AsyncStorage.getItem(storageKeys.PLAYLIST_LIST),
      AsyncStorage.getItem(storageKeys.FAVORITE_KEY),
    ]);
    if (res[0] && res[1]) {
      setPlaylist(JSON.parse(res[0]));
      setFavoriteList(JSON.parse(res[1]));
    }
  }

  useEffect(() => {
    getPlaylist();
  }, []);
  const createPlaylist = async (playlistObj: playlistObjType) => {
    try {
      const playlistJson = await AsyncStorage.getItem(
        storageKeys.PLAYLIST_LIST,
      );
      if (playlistJson != null) {
        const playlist_array = JSON.parse(playlistJson);
        playlist_array.push(playlistObj);
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      } else {
        const playlist_array: playlistObjType[] = [];
        playlist_array.push(playlistObj);
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const renamePlaylist = async (index: number, input: string) => {
    try {
      const playlistJson = await AsyncStorage.getItem(
        storageKeys.PLAYLIST_LIST,
      );
      if (playlistJson != null) {
        const playlist_array = JSON.parse(playlistJson);
        playlist_array[index].name = input;
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setFavoriteSong = async (songId: string) => {
    try {
      const favoriteJson = await AsyncStorage.getItem(storageKeys.FAVORITE_KEY);
      if (favoriteJson != null) {
        const favorite_array: string[] = JSON.parse(favoriteJson);
        let sondIndex = favorite_array.indexOf(songId);
        if (sondIndex > -1) {
          favorite_array.splice(sondIndex, 1);
        } else {
          favorite_array.push(songId);
        }
        await AsyncStorage.setItem(
          storageKeys.FAVORITE_KEY,
          JSON.stringify(favorite_array),
        );
        setFavoriteList(favorite_array);
      } else {
        let favorite_array = [];
        favorite_array.push(songId);
        await AsyncStorage.setItem(
          storageKeys.FAVORITE_KEY,
          JSON.stringify(favorite_array),
        );
        setFavoriteList(favorite_array);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const value = {
    favoriteList,
    playlist,
    setPlaylist,
    createPlaylist,
    renamePlaylist,
    setFavoriteSong,
  };
  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};
