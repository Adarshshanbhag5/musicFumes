import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {withRepeat, withTiming} from 'react-native-reanimated';

const SplashScreen = () => {
  const entering = (values: any) => {
    'worklet';
    const animations = {
      originY: withTiming(values.windowHeight / 2, {duration: 3000}),
      opacity: withTiming(1, {duration: 2000}),
      transform: [
        {rotate: withRepeat(withTiming('360deg', {duration: 2000}), -1, true)},
        {scale: withTiming(1, {duration: 3500})},
      ],
    };
    // console.log(values);
    const initialValues = {
      originY: -10,
      opacity: 0,
      transform: [{rotate: '0deg'}, {scale: 0.5}],
    };
    return {
      initialValues,
      animations,
    };
  };
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/react_icon.png')}
        style={styles.react__logo}
        entering={entering}
      />
      <Text style={styles.splash__text}>React music player</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'column',
  },
  splash__text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
  react__logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 10,
  },
});
