import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import globalStyle from '../utils/GlobalStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StoragePermissionContext} from '../context/StoragePermissionContext';
import {useAppStartUpStore} from '../zustand/appStartUpStore';

const StoragePermission = ({withIntro}: {withIntro: boolean}) => {
  const {getPermission} = useContext(StoragePermissionContext);
  const permissionGranted = useAppStartUpStore(
    state => state.permissionGranted,
  );
  return (
    <View>
      <View style={[globalStyle.flex__col__center, styles.icon__container]}>
        <MaterialIcons name="folder-open" color={'#fff'} size={38} />
      </View>
      <View style={globalStyle.flex__col__center}>
        <View style={globalStyle.flex__row__start}>
          <Text style={styles.text}>Musiplay requires</Text>
          <Text style={[styles.text, styles.bold__text]}>Storage</Text>
        </View>
        <Text style={{...styles.text, marginTop: 5}}>Permission:</Text>
      </View>
      <View style={styles.section__container}>
        <Text style={styles.list__text}>
          1. To read audio files and its tags
        </Text>
        <Text style={styles.list__text}>2. To load AlbumArt cover photos</Text>
      </View>
      <Pressable
        style={globalStyle.flex__col__center}
        onPress={async () => {
          // if (withIntro) {
          //   getPermissionFirstTime?.();
          // } else {
          await getPermission?.();
          // }
        }}
        disabled={permissionGranted}>
        <View
          style={
            permissionGranted
              ? {
                  ...globalStyle.flex__row__space,
                  ...styles.btn,
                  backgroundColor: '#ffff00',
                }
              : {...globalStyle.flex__row__space, ...styles.btn}
          }>
          <MaterialIcons
            name={permissionGranted ? 'done' : 'folder-open'}
            color={'#000'}
            size={26}
          />
          <Text style={styles.btn__text}>STORAGE PERMISSION</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default StoragePermission;

const styles = StyleSheet.create({
  icon__container: {
    marginVertical: 20,
  },
  section__container: {
    marginBottom: 10,
    marginTop: 25,
  },
  list__text: {
    marginBottom: 5,
    fontSize: 16,
    color: '#fff',
  },
  bold__text: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  text__bold: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  btn: {
    backgroundColor: '#7cfc00',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  btn__text: {
    color: '#000',
    textTransform: 'uppercase',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
