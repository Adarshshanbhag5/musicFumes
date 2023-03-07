import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyle from '../utils/GlobalStyle';
import RoundBtn from '../utils/RoundBtn';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IntroStackParamlist} from '../types/navigation';
type NavigationProp = NativeStackScreenProps<IntroStackParamlist, 'Intro'>;
const IntroScreen = ({navigation}: NavigationProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.header__container}>
        <Text style={styles.header__text}>Welcome to Musiplay</Text>
      </View>
      <View style={styles.section__container}>
        <Text style={styles.section__text}>
          Musiplay is a small yet feature-rich
        </Text>
        <Text style={{...styles.section__text, fontWeight: 'bold'}}>
          Offlie music player.
        </Text>
        <Text style={styles.section__text}>Developed using React Native</Text>
      </View>
      <View style={styles.section__container}>
        <Text style={styles.section__text}>
          It can organise and play audio files stored on your phone
        </Text>
        <View style={globalStyle.flex__row__start}>
          <MaterialIcons
            name="phone-android"
            color={'#fff'}
            size={24}
            style={styles.icon}
          />
          <MaterialIcons
            name="navigate-next"
            color={'#fff'}
            size={24}
            style={styles.icon}
          />
          <MaterialIcons name="headset" color={'#fff'} size={24} />
        </View>
      </View>
      <View style={styles.section__container}>
        <Text style={styles.section__text}>
          It can not download, stream or search music online using internet
        </Text>
        <View style={globalStyle.flex__row__start}>
          <MaterialCommunityIcons
            name="download-off"
            color={'#fff'}
            size={24}
            style={styles.icon}
          />
          <MaterialIcons name="cloud-off" color={'#fff'} size={24} />
        </View>
      </View>
      <View>
        <Text style={styles.section__text}>
          It does not send any data out of your phone. We have not added the
          "Internet permission" in this app.Which makes it 100% offline app.
        </Text>
      </View>
      <View style={styles.next__btn}>
        <RoundBtn
          iconColor={'#000'}
          iconName={'navigate-next'}
          onPress={() => {
            navigation.navigate('Permission');
          }}
          disabled={false}
          bg="#65ffa0"
        />
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    flex: 1,
  },
  header__container: {
    marginVertical: 20,
  },
  header__text: {
    fontSize: 30,
    fontWeight: '700',
  },
  section__container: {
    marginBottom: 40,
  },
  section__text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    lineHeight: 25,
  },
  next__btn: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  icon: {
    marginRight: 10,
  },
});
