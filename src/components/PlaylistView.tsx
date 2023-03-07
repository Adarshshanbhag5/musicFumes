import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyle from '../utils/GlobalStyle';
import Touch from '../utils/Touch';
import {useDarkMode} from '../zustand/store';

type PlaylistViewProps = {
  name: string;
  onPress: () => void;
  onLongPress: () => void;
};

const PlaylistView = ({name, onPress, onLongPress}: PlaylistViewProps) => {
  const themeStyle = useDarkMode();
  return (
    <Touch onPress={onPress} onLongPress={onLongPress}>
      <View style={[globalStyle.flex__row__start, styles.playlist__container]}>
        <MaterialIcons name="list" color={themeStyle.color} size={26} />
        <Text style={{...styles.playlist__text, color: themeStyle.color}}>
          {name}
        </Text>
      </View>
    </Touch>
  );
};

export default PlaylistView;

const styles = StyleSheet.create({
  playlist__container: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  playlist__text: {
    marginLeft: 20,
    fontSize: 18,
    color: '#fff',
  },
});
