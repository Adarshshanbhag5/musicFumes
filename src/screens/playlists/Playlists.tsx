import {StyleSheet, View} from 'react-native';
import React from 'react';
import {PlaylistStackScreenProps} from '../../types/navigation';
import useAppThemeStore from '../../zustand/store';
import {useAppDataStore} from '../../zustand/AppDataStore';
import {Button, Icon, List} from 'react-native-paper';

const Playlists = ({navigation}: PlaylistStackScreenProps<'playlists'>) => {
  const playlist = useAppDataStore(state => state.playlist);
  const accentColor = useAppThemeStore(state => state.accentColor);
  // const themeStyle = useDarkMode();

  function createNewPlaylist() {
    navigation.navigate('input_text', {
      type: 'newPlaylist',
      playlistIndex: null,
    });
  }

  function playlistLongPress(data: {name: string; key: string}, index: number) {
    navigation.navigate('playlistlongpress', {data: {...data, index}});
  }

  return (
    <View style={{flex: 1}}>
      <List.Section>
        <List.Item
          title="All songs"
          titleStyle={{fontSize: 16}}
          style={styles.list__container}
          left={() => <Icon source="folder-music" size={30} />}
          onPress={() => {
            navigation.navigate('AllSongs');
          }}
        />
        <List.Item
          title="Favorites"
          titleStyle={{fontSize: 16}}
          style={styles.list__container}
          left={() => <Icon source="heart" size={30} />}
          onPress={() => {
            navigation.navigate('favoritePlaylist');
          }}
        />
        <List.Item
          title="Most Played"
          titleStyle={{fontSize: 16}}
          style={styles.list__container}
          left={() => <Icon source="fire" size={30} />}
          onPress={() => {
            navigation.navigate('mostPlayed');
          }}
        />
      </List.Section>
      <List.Section>
        <List.Subheader
          style={{
            ...styles.playlist__text,
            color: accentColor ? accentColor : '#3AB0FF',
          }}>
          Your Playlists
        </List.Subheader>
        {playlist &&
          playlist.map((item, index) => (
            <List.Item
              title={item.name}
              key={item.key}
              onPress={() => {
                navigation.navigate('userPlaylist', {data: item});
              }}
              onLongPress={() => {
                playlistLongPress(item, index);
              }}
              left={props => <List.Icon {...props} icon="playlist-music" />}
            />
          ))}
      </List.Section>
      <Button
        icon="playlist-plus"
        mode="outlined"
        onPress={createNewPlaylist}
        style={styles.add__playlist__btn}>
        Add playlist
      </Button>
    </View>
  );
};

export default Playlists;

const styles = StyleSheet.create({
  list__container: {
    marginHorizontal: 20,
  },
  playlist__text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  add__playlist__btn: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    marginLeft: 20,
    marginTop: 15,
  },
});
