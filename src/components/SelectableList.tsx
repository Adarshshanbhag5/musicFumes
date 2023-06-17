import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  PixelRatio,
} from 'react-native';
import React from 'react';
import globalStyle from '../utils/GlobalStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAppThemeStore from '../zustand/store';
type SelectableListProps = {
  DATA: {name: string; key: string}[];
  selectId: string;
  setSelectId: React.Dispatch<React.SetStateAction<string>>;
};
const SelectableList = ({DATA, selectId, setSelectId}: SelectableListProps) => {
  const theme = useAppThemeStore();
  const size = PixelRatio.roundToNearestPixel(18);
  //   console.log(DATA);
  const renderItem = ({item}: {item: {name: string; key: string}}) => {
    // console.log(item);
    const backgroundColor =
      item.key === selectId ? theme.accentColor : 'transparent';
    const color = item.key === selectId ? '#000' : '#fff';
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setSelectId(item.key);
        }}>
        <View style={globalStyle.flex__row__start}>
          <View style={{...styles.selected, width: size, height: size}}>
            {item.key === selectId && (
              <MaterialIcons
                name="add"
                color={color}
                size={size - 4}
                style={{...styles.icon, backgroundColor}}
              />
            )}
          </View>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} extraData={selectId} />
    </View>
  );
};

export default SelectableList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  item: {
    padding: 5,
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: '8%',
  },
  title: {
    marginLeft: '5%',
    fontSize: 16,
  },
  selected: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderColor: '#fff',
    borderWidth: 1,
  },
  icon: {
    borderRadius: 2,
    fontWeight: 'bold',
  },
});
