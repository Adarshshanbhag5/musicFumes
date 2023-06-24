import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDarkMode} from '../../zustand/store';
type AlbumDetailProps = {
  title: string;
  artist: string;
  album: string;
  color?: string;
};
const AlbumDetail = ({title, artist, album, color}: AlbumDetailProps) => {
  const themeStyle = useDarkMode();
  return (
    <View style={styles.container}>
      <Text
        style={{...styles.title, color: color ? color : themeStyle.color}}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {title}
      </Text>
      <Text
        style={{...styles.text, color: color ? color : themeStyle.color}}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {artist}
      </Text>
      <Text
        style={{...styles.text, color: color ? color : themeStyle.color}}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {album}
      </Text>
    </View>
  );
};

export default AlbumDetail;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
});
