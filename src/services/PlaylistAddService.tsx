import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function PlaylistAddService(
  playlist: string,
  storageKey: string,
): Promise<void> {
  try {
    const playlistJson = await AsyncStorage.getItem(storageKey);
    if (playlistJson != null) {
      const playlist_array: string[] = JSON.parse(playlistJson);
      playlist_array.push(playlist);
      const unique = [...new Set(playlist_array)];
      await AsyncStorage.setItem(storageKey, JSON.stringify(unique));
    } else {
      const playlist_array: string[] = [];
      playlist_array.push(playlist);
      await AsyncStorage.setItem(storageKey, JSON.stringify(playlist_array));
    }
  } catch (err) {
    console.log(err);
  }
}
