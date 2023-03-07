import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {fsDataType, musicData} from '../types/data';
import {NativeModules, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import convertMsToTime from '../utils/DurationFromater';
const {RNGetAudioFiles} = NativeModules;

interface FileSystemStore {
  mediaStoreData?: musicData[];
  fsData?: fsDataType[];
}

export const useFileSystemStore = create<FileSystemStore>()(
  persist(_ => ({mediaStoreData: [], fsData: []}), {
    name: 'fileSystem',
    storage: createJSONStorage(() => AsyncStorage),
    partialize: state => ({fsData: state.fsData}),
  }),
);

function getSongs() {
  return new Promise<musicData[] | undefined>((resolve, reject) => {
    if (Platform.OS === 'android') {
      RNGetAudioFiles.getSong(
        (songs: musicData[] | undefined) => {
          resolve(songs);
        },
        (error: any) => {
          reject(error);
        },
      );
    }
  });
}

function setFs(res: musicData[]): fsDataType[] {
  const rootPath = RNFS.ExternalStorageDirectoryPath;
  let result = [
    ...new Set(
      res.map(
        item => item.url.replace('file://', '').match(/(.*)[\/\\]/)![1] || '',
      ),
    ),
  ];
  let arr: fsDataType[] = [];
  result.forEach(item => {
    let totalFiles = res.filter(
      val =>
        item === val.url.replace('file://', '').match(/(.*)[\/\\]/)![1] || '',
    );
    let totalDuration = convertMsToTime(
      totalFiles.reduce((total, val) => val.duration + total, 0),
    );
    let folderHierarchy = item.split(`${rootPath}/`).pop()!.split('/');
    arr = [
      ...arr,
      {
        path: item,
        files: totalFiles,
        totalFiles: totalFiles.length,
        folderHierarchy,
        totalDuration,
      },
    ];
  });
  return arr;
}

export async function getAllSongs() {
  try {
    //   setDataLoading(true);
    const res = await getSongs();
    if (res) {
      const formattedData = setFs(res);
      useFileSystemStore.setState(() => ({
        mediaStoreData: res,
        fsData: formattedData,
      }));
    }
    //   setData(res);
  } catch (err) {
    console.log(err);
  }
}
