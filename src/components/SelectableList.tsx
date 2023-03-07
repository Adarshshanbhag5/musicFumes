import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React from 'react';
type SelectableListProps = {
  DATA: {name: string; key: string}[];
  selectId: string;
  setSelectId: React.Dispatch<React.SetStateAction<string>>;
};
const SelectableList = ({DATA, selectId, setSelectId}: SelectableListProps) => {
  //   console.log(DATA);
  const renderItem = ({item}: {item: {name: string; key: string}}) => {
    // console.log(item);
    const backgroundColor = item.key === selectId ? '#B4E197' : '#333';
    const color = item.key === selectId ? '#000' : '#fff';
    return (
      <TouchableOpacity
        style={{...styles.item, backgroundColor: backgroundColor}}
        onPress={() => {
          setSelectId(item.key);
        }}>
        <Text style={{...styles.title, color: color}}>{item.name}</Text>
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
    marginVertical: 20,
  },
  item: {
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
  },
});
