import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Touch from '../../utils/Touch';
import globalStyle from '../../utils/GlobalStyle';
import GenerateUniqueId from '../../utils/GenerateUniqueId';
import ModalWrap from '../../components/ModalWrap';
import {RootStackScreenProps} from '../../types/navigation';
import {useDarkMode} from '../../zustand/store';
import {useAppDataStore} from '../../zustand/AppDataStore';

export default function InputModal({
  route,
  navigation,
}: RootStackScreenProps<'input_text'>) {
  const createPlaylist = useAppDataStore(state => state.setPlaylist);
  const renamePlaylist = useAppDataStore(state => state.renamePlaylist);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const themeStyle = useDarkMode();

  function okPressHandler() {
    if (input != '') {
      try {
        setLoading(true);
        switch (route.params.type) {
          case 'newPlaylist':
            const playlistObj = {
              name: input,
              key: GenerateUniqueId(),
            };
            createPlaylist(playlistObj);
            break;
          case 'renamePlaylist':
            renamePlaylist(route.params.playlistIndex!, input);
            break;
        }
        ToastAndroid.showWithGravity(
          'Done!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } catch (err) {
        ToastAndroid.showWithGravity(
          `${err}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } finally {
        setLoading(false);
        navigation.goBack();
      }
    } else {
      ToastAndroid.showWithGravity(
        'oops! something went wrong',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }
  return (
    <ModalWrap navigation={navigation}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.inputModal__wrap}>
          <View>
            <Text style={{...styles.header__text, color: themeStyle.color}}>
              Name of playlist
            </Text>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Name of playlist"
              style={styles.textInput}
              autoFocus
            />
          </View>
          <View style={[globalStyle.flex__row__end, styles.control__container]}>
            <Touch
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.control__btn}>
              <Text style={styles.text}>Cancel</Text>
            </Touch>
            <Touch
              style={styles.control__btn}
              onPress={okPressHandler}
              disabled={input === '' ? true : false}>
              <Text
                style={{
                  ...styles.text,
                  color: input === '' ? '#999' : '#B4E197',
                }}>
                Ok
              </Text>
            </Touch>
          </View>
        </View>
      )}
    </ModalWrap>
  );
}

const styles = StyleSheet.create({
  inputModal__wrap: {
    paddingHorizontal: 15,
  },
  header__text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomColor: '#B4E197',
    borderBottomWidth: 2,
    padding: 5,
    marginVertical: 15,
    color: '#B4E197',
  },
  text: {
    color: '#B4E197',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  control__container: {
    marginTop: 10,
  },
  control__btn: {
    marginHorizontal: 15,
  },
});
