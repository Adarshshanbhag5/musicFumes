import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import globalStyle from '../utils/GlobalStyle';
import {useDarkMode} from '../zustand/store';

type OptionsViewProps = {
  text: string;
  icon: string;
  onPress: () => void;
};
const OptionsView = ({text, icon, onPress}: OptionsViewProps) => {
  const themeStyle = useDarkMode();
  return (
    <TouchableHighlight
      underlayColor={'#00A0F3'}
      activeOpacity={0.6}
      onPress={onPress}
      style={{borderRadius: 5}}>
      <View style={[globalStyle.flex__row__start, styles.playlist__container]}>
        <MaterialIcons name={icon} color={themeStyle.color} size={26} />
        <Text style={{...styles.playlist__text, color: themeStyle.color}}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default OptionsView;

const styles = StyleSheet.create({
  playlist__container: {
    marginVertical: 10,
    marginHorizontal: 25,
  },
  playlist__text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
});
