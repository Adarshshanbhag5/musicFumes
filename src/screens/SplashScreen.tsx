import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  FadeOut,
  FlipInEasyX,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import globalStyle from '../utils/GlobalStyle';

const SplashScreen = () => {
  return (
    <Animated.View
      style={[globalStyle.flex__col__center, styles.container]}
      exiting={FadeOut}>
      <Animated.Image
        source={require('../assets/musicfumes_splash.png')}
        style={styles.react__logo}
        entering={SlideInLeft.duration(1500).springify()}
        exiting={SlideOutRight.duration(1500).springify()}
      />
      <Animated.Text
        style={styles.splash__text}
        entering={FlipInEasyX.delay(1000)}
        exiting={FadeOut}>
        MusicFumes
      </Animated.Text>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2B2B',
  },
  splash__text: {
    fontWeight: 'bold',
    fontSize: 25,
    elevation: 10,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 3,
  },
  react__logo: {
    width: '35%',
    resizeMode: 'contain',
  },
});
