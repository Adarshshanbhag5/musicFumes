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
import {useNavigation} from '@react-navigation/native';
import globalStyle from '../utils/GlobalStyle';
import {Track} from 'react-native-track-player';
import useAppThemeStore, {useDarkMode} from '../zustand/store';
type QueueListViewProps = {
  color: string;
  onPress: () => void;
  data: Track;
};
const QueueListView = ({
  // height,
  color,
  onPress,
  data,
}: QueueListViewProps) => {
  const accentColor = useAppThemeStore(state => state.accentColor);
  const navigation = useNavigation<any>();
  const themeStyle = useDarkMode();
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
              style={{...styles.title, color}}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {data.title}
            </Text>
            <Text
              style={{...styles.text, color}}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {data.artist}
            </Text>
            <View style={globalStyle.flex__row__space}>
              <Text
                style={{...styles.text, color}}
                ellipsizeMode="tail"
                numberOfLines={2}>
                {data.album}
              </Text>
              <Text style={{...styles.text, color}}>
                {new Date(data.duration! * 1000).toISOString().slice(14, 19)}
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
              style={{backgroundColor: color, borderRadius: 8}}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Pressable>
  );
};

export default QueueListView;

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    // paddingHorizontal: 14,
    marginHorizontal: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  innerContainer__textContainer: {
    width: '75%',
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
    width: '80%',
  },
  more_icon__container: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
});
