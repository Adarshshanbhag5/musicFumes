import {Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import globalStyle from '../utils/GlobalStyle';
import useAppThemeStore from '../zustand/store';
import RoundBtn from '../utils/RoundBtn';
// import {StoragePermissionContext} from '../context/StoragePermissionContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IntroStackParamlist} from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppStartUpStore} from '../zustand/appStartUpStore';
type Prop = NativeStackScreenProps<IntroStackParamlist, 'Preferences'>;
const UserPreferencesScreen = ({navigation}: Prop) => {
  const accentColor = useAppThemeStore(state => state.accentColor);
  const setIsFirstLaunch = useAppStartUpStore(state => state.setIsFirstLaunch);
  // const {setPermissionGranted} = useContext(StoragePermissionContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={{flex: 1}}>
      <Text style={{...styles.head, color: accentColor}}>THEME</Text>
      <View style={styles.section}>
        <View style={globalStyle.flex__row__space}>
          <Text>Dark theme</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Pressable
          style={[globalStyle.flex__row__start, globalStyle.btn]}
          onPress={() => {
            navigation.navigate('Colorpalettemodal');
          }}>
          <Text style={globalStyle.btn__text}>Accent color</Text>
          <View
            style={{
              ...globalStyle.color_view,
              backgroundColor: accentColor,
            }}
          />
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text>
          There are lots of useful settings available. Find them here:
        </Text>
        <Text>{'menu > settings'}</Text>
      </View>
      <View style={styles.next__btn}>
        <RoundBtn
          iconColor={'#000'}
          iconName={'done'}
          onPress={async () => {
            // setPermissionGranted?.(true);
            setIsFirstLaunch(false);
            await AsyncStorage.setItem('@user_onboarded', 'true');
          }}
          disabled={false}
        />
      </View>
      <View style={styles.prev__btn}>
        <RoundBtn
          iconColor={'#fff'}
          iconName={'navigate-before'}
          bg={'#555'}
          onPress={() => {
            navigation.navigate('Permission');
          }}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default UserPreferencesScreen;

const styles = StyleSheet.create({
  section: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#666',
  },
  head: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  next__btn: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  prev__btn: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
});
