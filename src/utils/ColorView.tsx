import {PixelRatio, Pressable, View} from 'react-native';
import React from 'react';
import useAppThemeStore from '../zustand/store';
type colorViewProps = {
  size: number;
  backgroundColor: string;
  navigation: any;
};
const ColorView = ({
  size = 32,
  backgroundColor,
  navigation,
}: colorViewProps) => {
  const setAccentColor = useAppThemeStore(state => state.setAccentColor);
  const sizeFull = PixelRatio.roundToNearestPixel(size);
  const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
  const pressHandler = () => {
    setAccentColor(backgroundColor);
    navigation.goBack();
  };
  return (
    <Pressable onPress={pressHandler}>
      <View
        style={{
          width: sizeFull,
          height: sizeFull,
          borderRadius: sizeHalf,
          margin: 5,
          backgroundColor,
        }}
      />
    </Pressable>
  );
};

export default ColorView;
