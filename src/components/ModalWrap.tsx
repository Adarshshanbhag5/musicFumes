import {Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import React, {ReactNode} from 'react';
import {useDarkMode} from '../zustand/store';
type ModalWrapProps = {
  children: ReactNode;
  navigation: any;
};
const ModalWrap = ({children, navigation}: ModalWrapProps) => {
  const themeStyle = useDarkMode();
  const {height} = useWindowDimensions();
  return (
    <View style={styles.modal__container}>
      <Pressable
        onPress={() => {
          navigation.popToTop();
        }}
        style={styles.backDrop}></Pressable>
      <View
        style={{
          ...styles.modal,
          maxHeight: height - 100,
          backgroundColor: themeStyle.modalBg,
        }}>
        {children}
      </View>
    </View>
  );
};

export default ModalWrap;

const styles = StyleSheet.create({
  modal__container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 12,
    elevation: 8,
    // backgroundColor: '#222',
    width: '90%',
    zIndex: 200,
  },
  backDrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
});
