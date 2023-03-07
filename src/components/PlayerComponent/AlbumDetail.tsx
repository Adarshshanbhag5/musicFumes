import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDarkMode} from '../../zustand/store';
type AlbumDetailProps = {
  title: string;
  artist: string;
  album: string;
};
const AlbumDetail = ({title, artist, album}: AlbumDetailProps) => {
  const themeStyle = useDarkMode();
  return (
    <View style={styles.container}>
      <Text
        style={{...styles.title, color: themeStyle.color}}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {title}
      </Text>
      <Text
        style={{...styles.text, color: themeStyle.color}}
        ellipsizeMode="tail"
        numberOfLines={1}>
        {artist}
      </Text>
      <Text
        style={{...styles.text, color: themeStyle.color}}
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
    marginBottom: 10,
    marginTop: 25,
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
