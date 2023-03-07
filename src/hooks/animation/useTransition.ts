import {useEffect} from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const useTransition = (state: boolean) => {
  const value = useSharedValue(0);
  useEffect(() => {
    value.value = state ? 1 : 0;
  }, [value, state]);
  const transition = useDerivedValue(() => {
    return withSpring(value.value);
  });
  return transition;
};

export default useTransition;
