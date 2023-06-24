import {StatusBar} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import type {StatusBarProps} from 'react-native';

function isDarkColor(hexColor: string): boolean {
  // Remove the '#' symbol if present
  const color = hexColor.replace('#', '');

  // Convert the color to RGB values
  const r = parseInt(color.substring(0, 2));
  const g = parseInt(color.substring(2, 4));
  const b = parseInt(color.substring(4, 6));

  // Calculate the relative luminance
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Return true if the luminance is below 0.5 (considered dark)
  return luminance < 0.5;
}

type FocusAwareStatusBarType = {
  statusBarprops: StatusBarProps;
  hexColor: string;
};

const FocusAwareStatusBar = ({
  statusBarprops,
  hexColor,
}: FocusAwareStatusBarType) => {
  const isFocused = useIsFocused();

  const isDark = isDarkColor(hexColor);

  return isFocused ? (
    <StatusBar
      {...statusBarprops}
      barStyle={isDark ? 'light-content' : 'dark-content'}
    />
  ) : null;
};

export default FocusAwareStatusBar;
