import {StyleSheet} from 'react-native';

const globalStyle = StyleSheet.create({
  flex__row__space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex__row__start: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flex__row__end: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flex__row__center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex__col__center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    // width: '40%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
  },
  btn__text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  color_view: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default globalStyle;
