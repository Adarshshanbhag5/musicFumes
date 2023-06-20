import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../utils/Touch';
import Settings from './Settings';
import {MoreOptionStackScreenProps} from '../../types/navigation';
import {useDarkMode} from '../../zustand/store';
import globalStyle from '../../utils/GlobalStyle';

const MoreOptionsInner = ({navigation}: MoreOptionStackScreenProps<'more'>) => {
  const themeStyle = useDarkMode();
  return (
    <View>
      <View style={styles.settings__container}>
        <Text style={{...styles.settings__text, color: themeStyle.color}}>
          Settings
        </Text>
        <Settings navigation={navigation} />
      </View>
      <Touch
        onPress={() => {
          navigation.navigate('sleep_timer');
        }}>
        <View style={[globalStyle.flex__row__start, styles.options__container]}>
          <MaterialIcons name="snooze" color={themeStyle.color} size={28} />
          <Text style={{...styles.options__text, color: themeStyle.color}}>
            Sleep timer
          </Text>
        </View>
      </Touch>
      <Touch
        onPress={() => {
          navigation.navigate('Help_and_info');
        }}>
        <View style={[globalStyle.flex__row__start, styles.options__container]}>
          <MaterialIcons name="help" color={themeStyle.color} size={28} />
          <Text style={{...styles.options__text, color: themeStyle.color}}>
            Help and Info
          </Text>
        </View>
      </Touch>
    </View>
  );
};

export default MoreOptionsInner;

const styles = StyleSheet.create({
  options__container: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  options__text: {
    marginLeft: 20,
    fontSize: 16,
    color: '#fff',
  },
  settings__container: {
    marginBottom: 10,
    paddingLeft: 30,
    paddingRight: 10,
  },
  settings__text: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
