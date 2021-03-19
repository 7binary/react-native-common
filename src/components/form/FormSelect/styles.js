import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  box: {},
  container: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: '#BBB',
  },
  icon: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingLeft: 20,
    paddingBottom: 5,
    zIndex: 1000,
  },
  downIcon: {
    fontSize: 20,
    color: '#CCC',
  },
  label: {
    fontSize: 13,
    color: 'grey',
  },
});
