import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalWrap from '../../components/ModalWrap';
import ColorView from '../../utils/ColorView';
import {colors} from '../../utils/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IntroStackParamlist} from '../../types/navigation';
import {useDarkMode} from '../../zustand/store';
type Prop = NativeStackScreenProps<IntroStackParamlist, 'Colorpalettemodal'>;
const ColorPaletteModal = ({navigation}: Prop) => {
  const themeStyle = useDarkMode();
  return (
    <ModalWrap navigation={navigation}>
      <View style={styles.container}>
        <Text style={{...styles.head, color: themeStyle.color}}>
          Accent color
        </Text>
        <View style={styles.color__container}>
          {colors.map(color => (
            <ColorView
              backgroundColor={color.value}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  head: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 5,
  },
});
