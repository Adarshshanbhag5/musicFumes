import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyle from '../utils/GlobalStyle';
import Touch from '../utils/Touch';
import {useDarkMode} from '../zustand/store';
type FolderListViewProps = {
  onPress: () => void;
  name: string;
  path: string;
};
const FolderListView = ({onPress, name, path}: FolderListViewProps) => {
  const themeStyle = useDarkMode();
  return (
    <Touch onPress={onPress}>
      <View style={[globalStyle.flex__row__start, styles.folder__container]}>
        <MaterialIcons name="folder-open" color={themeStyle.color} size={28} />
        <View>
          <Text style={{...styles.folder__text, color: themeStyle.color}}>
            {name}
          </Text>
          <Text
            style={{...styles.path_text, color: themeStyle.color}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {path.replace('/storage/emulated/0', 'internal storage')}
          </Text>
        </View>
      </View>
    </Touch>
  );
};

export default FolderListView;

const styles = StyleSheet.create({
  folder__container: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  folder__text: {
    marginLeft: 20,
    fontSize: 16,
    color: '#fff',
  },
  path_text: {
    fontSize: 12,
    marginLeft: 20,
  },
});
