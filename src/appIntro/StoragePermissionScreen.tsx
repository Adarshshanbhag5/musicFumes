import {StyleSheet, View} from 'react-native';
import React from 'react';
import RoundBtn from '../utils/RoundBtn';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IntroStackParamlist} from '../types/navigation';
import StoragePermission from '../components/StoragePermission';
import {useAppStartUpStore} from '../zustand/appStartUpStore';
type Prop = NativeStackScreenProps<IntroStackParamlist, 'Permission'>;

const StoragePermissionScreen = ({navigation}: Prop) => {
  const permissionGranted = useAppStartUpStore(
    state => state.permissionGranted,
  );
  return (
    <View style={styles.container}>
      <StoragePermission />
      <View style={styles.next__btn}>
        {permissionGranted && (
          <RoundBtn
            iconColor={'#000'}
            iconName={'navigate-next'}
            onPress={() => {
              navigation.navigate('Preferences');
            }}
            disabled={!permissionGranted ? true : false}
          />
        )}
      </View>
      <View style={styles.prev__btn}>
        <RoundBtn
          iconColor={'#fff'}
          iconName={'navigate-before'}
          bg={'#555'}
          onPress={() => {
            navigation.navigate('Intro');
          }}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default StoragePermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
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
