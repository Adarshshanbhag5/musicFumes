import {View, Text, StyleSheet, Pressable, Switch} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyle from '../../utils/GlobalStyle';
import Touch from '../../utils/Touch';
import useAppThemeStore, {useDarkMode} from '../../zustand/store';

const Settings = ({navigation}: {navigation: any}) => {
  const theme = useAppThemeStore();
  const themeStyle = useDarkMode();
  const [isEnabled, setIsEnabled] = useState<boolean>(theme.darkMode);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    theme.setDarkMode(!isEnabled);
  };

  return (
    <View>
      <View style={[globalStyle.flex__row__start, styles.wrapper]}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          color={themeStyle.color}
          size={28}
          style={styles.icon}
        />
        <View style={{flexGrow: 1}}>
          <Text style={{...styles.main__text, color: themeStyle.color}}>
            Dark Mode
          </Text>
          <Text style={{...styles.sub__text, color: themeStyle.color}}>
            Changes app theme to dark
          </Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={[globalStyle.flex__row__start, styles.wrapper]}>
        <MaterialIcons
          name="color-lens"
          color={themeStyle.color}
          size={28}
          style={styles.icon}
        />
        <Pressable
          style={[globalStyle.flex__row__start, globalStyle.btn]}
          onPress={() => {
            navigation.navigate('Colorpalettemodal');
          }}>
          <Text style={{...globalStyle.btn__text, color: themeStyle.color}}>
            Accent color
          </Text>
          <View
            style={{
              ...globalStyle.color_view,
              backgroundColor: theme.accentColor,
            }}
          />
        </Pressable>
      </View>
      <Touch onPress={() => {}}>
        <View style={[globalStyle.flex__row__start, styles.wrapper]}>
          <MaterialCommunityIcons
            name="folder-alert-outline"
            color={themeStyle.color}
            size={28}
            style={styles.icon}
          />
          <View>
            <Text style={{...styles.main__text, color: themeStyle.color}}>
              Folders to skip
            </Text>
            <Text style={{...styles.sub__text, color: themeStyle.color}}>
              whatsapp audio
            </Text>
          </View>
        </View>
      </Touch>
      <Touch onPress={() => {}}>
        <View style={[globalStyle.flex__row__start, styles.wrapper]}>
          <MaterialIcons
            name="unfold-more"
            color={themeStyle.color}
            size={28}
            style={styles.icon}
          />
          <View>
            <Text style={{...styles.main__text, color: themeStyle.color}}>
              Tab-bar position
            </Text>
            <Text style={{...styles.sub__text, color: themeStyle.color}}>
              Bottom
            </Text>
          </View>
        </View>
      </Touch>
      <Touch onPress={() => {}}>
        <View style={[globalStyle.flex__row__start, styles.wrapper]}>
          <MaterialIcons
            name="sync"
            color={'#d50000'}
            size={28}
            style={styles.icon}
          />
          <View>
            <Text style={{...styles.main__text, color: themeStyle.color}}>
              Scan
            </Text>
            <Text style={{...styles.sub__text, color: themeStyle.color}}>
              Sacn mediastore and update
            </Text>
          </View>
        </View>
      </Touch>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  main__text: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
    fontSize: 16,
  },
  sub__text: {
    fontSize: 12,
  },
  icon: {
    marginRight: 20,
  },
});
