import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalWrap from '../../components/ModalWrap';
import globalStyle from '../../utils/GlobalStyle';
import Touch from '../../utils/Touch';
import convertMsToTime from '../../utils/DurationFromater';
import {RootStackScreenProps} from '../../types/navigation';
import {useDarkMode} from '../../zustand/store';

const SongInfoModal = ({
  route,
  navigation,
}: RootStackScreenProps<'songInfo_modal'>) => {
  const themeStyle = useDarkMode();
  return (
    <ModalWrap navigation={navigation}>
      <View>
        <View style={[globalStyle.flex__row__start, styles.header__container]}>
          <MaterialIcons
            name="info-outline"
            color={themeStyle.color}
            size={26}
          />
          <Text style={{...styles.head__text, color: themeStyle.color}}>
            Song info
          </Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={{...globalStyle.flex__col__center, paddingBottom: 5}}>
            <Image
              source={
                route.params.data.artwork
                  ? {uri: route.params.data.artwork}
                  : require('../../assets/musicfumes_placeholder_dark.jpg')
              }
              style={styles.albumArt}
            />
            <View style={styles.info__container}>
              <Text
                style={{
                  ...styles.title__text,
                  fontSize: 16,
                  textAlign: 'center',
                  color: themeStyle.color,
                }}>
                File name
              </Text>
              <Text style={{textAlign: 'center', color: themeStyle.color}}>
                {route.params.data.title}
              </Text>
            </View>
          </View>
          <View style={styles.inner__container}>
            <View style={styles.info__container}>
              <Text style={{...styles.title__text, color: themeStyle.color}}>
                Title
              </Text>
              <Text style={styles.value__text}>{route.params.data.title}</Text>
            </View>
            <View style={styles.info__container}>
              <Text style={{...styles.title__text, color: themeStyle.color}}>
                Album
              </Text>
              <Text style={styles.value__text}>{route.params.data.album}</Text>
            </View>
            <View style={styles.info__container}>
              <Text style={{...styles.title__text, color: themeStyle.color}}>
                Artist
              </Text>
              <Text style={styles.value__text}>{route.params.data.artist}</Text>
            </View>
            <View style={styles.info__container}>
              <Text style={{...styles.title__text, color: themeStyle.color}}>
                Location
              </Text>
              <Text style={styles.value__text}>{route.params.data.url}</Text>
            </View>
            <View style={styles.info__container}>
              <Text style={{...styles.title__text, color: themeStyle.color}}>
                Duration
              </Text>
              <Text style={styles.value__text}>
                {convertMsToTime(route.params.data.duration)}
              </Text>
            </View>
            <View style={styles.info__container}>
              <Text style={{...styles.title__text, color: themeStyle.color}}>
                Format
              </Text>
              <Text style={styles.value__text}>
                {route.params.data.contentType}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={[globalStyle.flex__row__end, styles.control__container]}>
          <Touch
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.control__btn}>
            <Text style={styles.control__btn__text}>Done</Text>
          </Touch>
        </View>
      </View>
    </ModalWrap>
  );
};

export default SongInfoModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    maxHeight: '88%',
  },
  header__container: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  head__text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  inner__container: {
    paddingVertical: 10,
    borderTopColor: '#444',
    borderTopWidth: 1,
  },
  info__container: {
    marginVertical: 8,
  },
  title__text: {
    fontWeight: 'bold',
    color: '#fff',
  },
  value__text: {
    fontSize: 14,
  },
  albumArt: {
    alignSelf: 'center',
    resizeMode: 'cover',
    width: 175,
    height: 175,
    marginBottom: 5,
    borderRadius: 5,
  },
  control__container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  control__btn: {
    marginHorizontal: 15,
  },
  control__btn__text: {
    color: '#B4E197',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
