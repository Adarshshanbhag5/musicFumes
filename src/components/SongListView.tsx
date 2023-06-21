import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import globalStyle from '../utils/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {musicTrack} from '../types/data';
import useAppThemeStore, {useDarkMode} from '../zustand/store';
type SongListViewProps = {
  data: musicTrack;
  onPress: () => void;
};
const SongListView = ({data, onPress}: SongListViewProps) => {
  const accentColor = useAppThemeStore(state => state.accentColor);
  const themeStyle = useDarkMode();
  const navigation = useNavigation<any>();
  const handleOptionPress = () => {
    navigation.navigate('option_modal', {data});
  };
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? `${accentColor}66` : 'transparent',
        },
      ]}>
      <View style={[globalStyle.flex__row__space, styles.listContainer]}>
        <View style={[globalStyle.flex__row__space, styles.innerContainer]}>
          <Image
            source={
              data.artwork
                ? {uri: data.artwork}
                : require('../assets/musicfumes_placeholder_dark.jpg')
            }
            style={styles.albumArt}
          />
          <View style={styles.innerContainer__textContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.title, color: themeStyle.color}}>
              {data.title}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.text, color: themeStyle.color}}>
              {data.artist}
            </Text>
            <View style={globalStyle.flex__row__space}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{...styles.text, color: themeStyle.color}}>
                {data.album}
              </Text>
              <Text style={{...styles.text, color: themeStyle.color}}>
                {new Date(data.duration * 1000).toISOString().slice(14, 19)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.more_icon__container}>
          <TouchableHighlight
            onPress={handleOptionPress}
            underlayColor={themeStyle.pressedBg}>
            <MaterialIcons
              name="more-horiz"
              color={themeStyle.bg}
              size={22}
              style={{
                backgroundColor: themeStyle.color,
                borderRadius: 8,
                margin: 8,
              }}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Pressable>
  );
};

export default SongListView;

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    // paddingHorizontal: 14,
    marginBottom: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  innerContainer__textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 1,
    color: '#fff',
    fontSize: 11,
  },
  innerContainer: {
    flex: 1,
  },
  more_icon__container: {
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
});
