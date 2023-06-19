import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useAppThemeStore from '../zustand/store';
import globalStyle from './GlobalStyle';

type RoundBtnPropTypes = {
  iconName: string;
  iconColor: string;
  bg?: string;
  onPress: () => void;
  disabled: boolean;
};
const RoundBtn = ({
  iconName,
  iconColor,
  bg,
  onPress,
  disabled,
}: RoundBtnPropTypes) => {
  const accentColor = useAppThemeStore(state => state.accentColor);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{color: '#222', borderless: false, foreground: true}}>
      <View
        style={{
          ...globalStyle.flex__col__center,
          ...styles.btn__container,
          backgroundColor: bg ? bg : accentColor,
        }}>
        <MaterialIcons name={iconName} color={iconColor} size={28} />
      </View>
    </Pressable>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  btn__container: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
