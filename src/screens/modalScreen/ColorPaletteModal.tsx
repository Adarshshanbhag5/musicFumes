import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalWrap from '../../components/ModalWrap';
import ColorView from '../../utils/ColorView';
import {colors} from '../../utils/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IntroStackParamlist} from '../../types/navigation';
import {useDarkMode} from '../../zustand/store';
import globalStyle from '../../utils/GlobalStyle';
type Prop = NativeStackScreenProps<IntroStackParamlist, 'Colorpalettemodal'>;
const ColorPaletteModal = ({navigation}: Prop) => {
  const themeStyle = useDarkMode();
  return (
    <ModalWrap navigation={navigation}>
      <View style={styles.container}>
        <Text style={{...styles.head, color: themeStyle.color}}>
          Accent color
        </Text>
        <View style={[globalStyle.flex__row__start, styles.color__container]}>
          {colors.map(color => (
            <ColorView
              backgroundColor={
                themeStyle.bg === '#fff' ? color.value[1] : color.value[0]
              }
              key={color.key}
              size={54}
              navigation={navigation}
            />
          ))}
        </View>
      </View>
    </ModalWrap>
  );
};

export default ColorPaletteModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  color__container: {
    flexWrap: 'wrap',
  },
  head: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 5,
  },
});
