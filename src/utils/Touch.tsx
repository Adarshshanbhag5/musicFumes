import {Pressable, StyleProp, Vibration, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {useDarkMode} from '../zustand/store';
type TouchProps = {
  children: ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
};
const Touch = ({children, onPress, onLongPress, style}: TouchProps) => {
  const themeStyle = useDarkMode();
  return (
    <Pressable
      onPress={onPress}
      onLongPress={() => {
        Vibration.vibrate(40);
        onLongPress?.();
      }}
      style={({pressed}) => [
        {backgroundColor: pressed ? themeStyle.pressedBg : 'transparent'},
        style,
      ]}
      android_ripple={{color: '#222', borderless: false, foreground: true}}>
      {children}
    </Pressable>
  );
};

export default Touch;
