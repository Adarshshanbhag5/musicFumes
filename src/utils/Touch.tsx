import {Pressable, StyleProp, Vibration, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {useDarkMode} from '../zustand/store';
type TouchProps = {
  children: ReactNode;
  onPress: () => void;
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};
const Touch = ({
  children,
  onPress,
  onLongPress,
  style,
  disabled,
}: TouchProps) => {
  const themeStyle = useDarkMode();
  return (
    <Pressable
      onPress={onPress}
      onLongPress={() => {
        Vibration.vibrate(40);
        onLongPress?.();
      }}
      disabled={disabled}
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
