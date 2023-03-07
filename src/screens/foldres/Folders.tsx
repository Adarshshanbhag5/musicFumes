import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FolderListView from '../../components/FolderListView';
import globalStyle from '../../utils/GlobalStyle';
import {useFileSystemStore} from '../../zustand/FileSystemStore';
import {fsDataType} from '../../types/data';
import {FolderStackScreenProps} from '../../types/navigation';
import {useDarkMode} from '../../zustand/store';

// import RNFS from 'react-native-fs';

const Folders = ({navigation}: FolderStackScreenProps<'InternalStorage'>) => {
  const fsData = useFileSystemStore(state => state.fsData);
  const themeStyle = useDarkMode();

  const handlePress = (item: fsDataType) => {
    navigation.navigate('Music', {
      data: item,
      hierarchyCount: 1,
    });
  };

  const renderItem = useCallback(
    ({item}: {item: fsDataType}) => (
      <FolderListView
        onPress={() => {
          handlePress(item);
        }}
        name={item.folderHierarchy[0]}
        path={item.path}
      />
    ),
    [handlePress],
  );

  return (
    <View style={{flex: 1}}>
      <View style={[globalStyle.flex__row__start, styles.header]}>
        <MaterialIcons
          name="folder-special"
          color={themeStyle.color}
          size={26}
        />
        <Text style={{...styles.header__text, color: themeStyle.color}}>
          Internal Storage
        </Text>
      </View>
      <View style={[globalStyle.flex__row__start, styles.innerContainer]}>
        <Text style={{color: themeStyle.color}}>20 songs</Text>
        <Text style={{color: themeStyle.color}}>1:38:15</Text>
      </View>
      {fsData && (
        <FlatList
          data={fsData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Folders;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
  },
  header__text: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  innerContainer: {
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
    paddingHorizontal: 12,
    marginVertical: 18,
  },
});
