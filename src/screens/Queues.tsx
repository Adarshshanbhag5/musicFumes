import {Pressable, StyleSheet, Vibration, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useCallback, useEffect, useState} from 'react';
import useCurrentQueue from '../hooks/useCurrentQueue';
import TrackPlayer, {Track} from 'react-native-track-player';
import QueueListView from '../components/QueueListView';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {setDragFalg} from '../services/PlaybackService';
import useAppThemeStore, {useDarkMode} from '../zustand/store';
import globalStyle from '../utils/GlobalStyle';

const Queues = () => {
  const {queue, trackIndex} = useCurrentQueue();
  const accentColor = useAppThemeStore(state => state.accentColor);
  const themeStyle = useDarkMode();
  const [listData, setListData] = useState<Track[] | undefined>();
  // const [input, setInput] = useState<string>('');
  useEffect(() => {
    setListData(queue);
  }, [queue]);

  const handlePress = async (index: number) => {
    await TrackPlayer.skip(index);
    TrackPlayer.play();
  };

  const renderItem = useCallback(
    ({item, drag, isActive, getIndex}: RenderItemParams<Track>) => {
      const borderColor =
        trackIndex === getIndex() ? accentColor : 'transparent';
      const color = trackIndex === getIndex() ? accentColor : themeStyle.color;
      return (
        <View
          style={{
            ...styles.renderItemView,
            ...globalStyle.flex__row__start,
            borderColor,
          }}>
          <Pressable
            onLongPress={() => {
              Vibration.vibrate(40);
              drag();
            }}
            disabled={isActive}>
            <View
              style={{
                // backgroundColor: 'green',
                paddingHorizontal: 5,
                marginLeft: 10,
              }}>
              <MaterialIcons name="drag-handle" color={color} size={24} />
            </View>
          </Pressable>
          <QueueListView
            color={color}
            data={item}
            onPress={() => {
              handlePress(getIndex()!);
            }}
          />
        </View>
      );
    },
    [handlePress, accentColor, trackIndex],
  );

  // const DATA: Track[] | undefined = useMemo(() => {
  //   return listData?.filter(val => {
  //     if (input === '') {
  //       return listData;
  //     } else if (
  //       val.title!.toLowerCase().includes(input.toLowerCase()) ||
  //       val.artist!.toLowerCase().includes(input.toLowerCase())
  //     ) {
  //       return val;
  //     }
  //   });
  // }, [input]);

  return (
    <View style={{flex: 1}}>
      {/* <View>
        <TextInput
          style={{...styles.textInput, color: themeStyle.color}}
          placeholder="search in this queue..."
          placeholderTextColor={themeStyle.color}
          value={input}
          onChangeText={setInput}
        />
      </View> */}
      <View style={{flex: 1, paddingTop: 5}}>
        {listData && (
          <DraggableFlatList
            style={{paddingHorizontal: 10}}
            data={listData}
            renderItem={renderItem}
            extraData={trackIndex}
            keyExtractor={item => item.id}
            onDragEnd={({data, from, to}) => {
              setListData(data);
              if (from === to) {
                setDragFalg(false, data);
              } else {
                setDragFalg(true, data);
              }
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Queues;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 15,
    marginBottom: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
  },
  renderItemView: {
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 2,
    zIndex: 5,
  },
});
