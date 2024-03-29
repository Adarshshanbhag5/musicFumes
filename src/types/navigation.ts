import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {musicTrack} from './data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

export type IntroStackParamlist = {
  Intro: undefined;
  Permission: undefined;
  Preferences: undefined;
  Colorpalettemodal: undefined;
};

export type RootStackParamlist = {
  musicFumes: undefined;
  input_text: {type: string; playlistIndex: number | null};
  playlistlongpress: {data: {name: string; key: string; index: number}};
  option_modal: {data: musicTrack};
  addPlaylist_modal: {data: musicTrack};
  Colorpalettemodal: undefined;
  songInfo_modal: {data: musicTrack};
};

export type MusicFumesParamlist = {
  Queue: undefined;
  NowPlaying: undefined;
  FoldersNavigator: NavigatorScreenParams<FoldersStackParamlist>;
  AlbumsNavigator: NavigatorScreenParams<AlbumStackParamlist>;
  Search: undefined;
  PlaylistsNavigator: undefined;
  MoreOptions: undefined;
};

export type FoldersStackParamlist = {
  InternalStorage: undefined;
  Music: {data: musicTrack[]; path: string};
};

export type AlbumStackParamlist = {
  albums: undefined;
  albumList: {data: musicTrack[]};
};

export type PlaylistStackParamlist = {
  playlists: undefined;
  AllSongs: undefined;
  userPlaylist: {data: {name: string; key: string}};
  favoritePlaylist: undefined;
  mostPlayed: undefined;
};

export type MoreOptionsStackParamlist = {
  more: undefined;
  Help_and_info: undefined;
  sleep_timer: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamlist> =
  NativeStackScreenProps<RootStackParamlist, T>;

export type MusicFumesScreenProps<T extends keyof MusicFumesParamlist> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<MusicFumesParamlist, T>,
    RootStackScreenProps<keyof RootStackParamlist>
  >;

export type FolderStackScreenProps<T extends keyof FoldersStackParamlist> =
  CompositeScreenProps<
    NativeStackScreenProps<FoldersStackParamlist, T>,
    CompositeScreenProps<
      MaterialTopTabScreenProps<MusicFumesParamlist>,
      RootStackScreenProps<keyof RootStackParamlist>
    >
  >;

export type AlbumStackScreenProps<T extends keyof AlbumStackParamlist> =
  CompositeScreenProps<
    NativeStackScreenProps<AlbumStackParamlist, T>,
    CompositeScreenProps<
      MaterialTopTabScreenProps<MusicFumesParamlist>,
      RootStackScreenProps<keyof RootStackParamlist>
    >
  >;

export type PlaylistStackScreenProps<T extends keyof PlaylistStackParamlist> =
  CompositeScreenProps<
    NativeStackScreenProps<PlaylistStackParamlist, T>,
    CompositeScreenProps<
      MaterialTopTabScreenProps<MusicFumesParamlist>,
      RootStackScreenProps<keyof RootStackParamlist>
    >
  >;

export type MoreOptionStackScreenProps<
  T extends keyof MoreOptionsStackParamlist,
> = CompositeScreenProps<
  NativeStackScreenProps<MoreOptionsStackParamlist, T>,
  CompositeScreenProps<
    MaterialTopTabScreenProps<MusicFumesParamlist>,
    RootStackScreenProps<keyof RootStackParamlist>
  >
>;
