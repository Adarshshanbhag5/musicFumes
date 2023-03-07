import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import RoundBtn from '../utils/RoundBtn';
import {StoragePermissionContext} from '../context/StoragePermissionContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IntroStackParamlist} from '../types/navigation';
import StoragePermission from '../components/StoragePermission';
type Prop = NativeStackScreenProps<IntroStackParamlist, 'Permission'>;

const StoragePermissionScreen = ({navigation}: Prop) => {
  const {permissionGranted} = useContext(StoragePermissionContext);
  return (
    <View style={styles.container}>
      <StoragePermission withIntro={true} />
      <View style={styles.next__btn}>
        <RoundBtn
          iconColor={'#000'}
          iconName={'navigate-next'}
          onPress={() => {
            navigation.navigate('Preferences');
          }}
          disabled={permissionGranted ? true : false}
        />
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
